import { DocumentData, DocumentComparisonCategory } from '../types';

export interface ComparisonResult {
  docA: { id: string; name: string; type: string; isSigned: boolean };
  docB: { id: string; name: string; type: string; isSigned: boolean };
  isTypeMismatch: boolean;
  typeMismatchWarning?: string;
  categories: DocumentComparisonCategory[];
  summaryInsights: string[];
}

export function compareDocuments(docA: DocumentData, docB: DocumentData): ComparisonResult {
  const isTypeMismatch = docA.docType !== docB.docType;
  const docASigned = docA.signatures.present;
  const docBSigned = docB.signatures.present;

  let typeMismatchWarning: string | undefined;
  if (isTypeMismatch) {
    typeMismatchWarning = `Document A (${docA.fileName}) is classified as "${docA.docType.replace('_', ' ')}", whereas Document B (${docB.fileName}) is classified as "${docB.docType.replace('_', ' ')}". Comparing dissimilar legal instruments has limited direct applicability.`;
  }

  const categories: DocumentComparisonCategory[] = [];
  const summaryInsights: string[] = [];

  // Align clauses by categories
  const allCategories = new Set<string>();
  docA.keyClauses.forEach(c => allCategories.add(c.category));
  docB.keyClauses.forEach(c => allCategories.add(c.category));

  allCategories.forEach(cat => {
    const clauseA = docA.keyClauses.find(c => c.category === cat);
    const clauseB = docB.keyClauses.find(c => c.category === cat);

    if (clauseA && clauseB) {
      // Check similarity
      const textA = clauseA.originalText.trim().toLowerCase();
      const textB = clauseB.originalText.trim().toLowerCase();

      if (textA === textB) {
        categories.push({
          category: cat,
          clauseA: { ref: clauseA.clauseNumber, text: clauseA.originalText, plain: clauseA.plainExplanation },
          clauseB: { ref: clauseB.clauseNumber, text: clauseB.originalText, plain: clauseB.plainExplanation },
          status: 'identical',
          practicalEffect: 'Both documents contain verbatim identical terms with identical legal obligations.'
        });
      } else {
        // Difference in meaning
        categories.push({
          category: cat,
          clauseA: { ref: `${clauseA.clauseNumber} (Page ${clauseA.pageNumber})`, text: clauseA.originalText, plain: clauseA.plainExplanation },
          clauseB: { ref: `${clauseB.clauseNumber} (Page ${clauseB.pageNumber})`, text: clauseB.originalText, plain: clauseB.plainExplanation },
          status: 'different_impact',
          practicalEffect: `Document A specifies: "${clauseA.title}" whereas Document B specifies: "${clauseB.title}". This creates a substantive variation in obligations or financial liabilities.`
        });
        summaryInsights.push(`Variation in "${cat}": review differences between ${clauseA.clauseNumber} and ${clauseB.clauseNumber}.`);
      }
    } else if (clauseA && !clauseB) {
      categories.push({
        category: cat,
        clauseA: { ref: `${clauseA.clauseNumber} (Page ${clauseA.pageNumber})`, text: clauseA.originalText, plain: clauseA.plainExplanation },
        status: 'only_in_a',
        practicalEffect: `Present in ${docA.fileName} under ${clauseA.clauseNumber}, but completely missing from ${docB.fileName}. ${docB.fileName} lacks protections or restrictions covered under this topic.`
      });
      summaryInsights.push(`Clause present only in Document A: "${cat}" (${clauseA.clauseNumber}).`);
    } else if (!clauseA && clauseB) {
      categories.push({
        category: cat,
        clauseB: { ref: `${clauseB.clauseNumber} (Page ${clauseB.pageNumber})`, text: clauseB.originalText, plain: clauseB.plainExplanation },
        status: 'only_in_b',
        practicalEffect: `Present only in ${docB.fileName} under ${clauseB.clauseNumber}, but absent from ${docA.fileName}. This represents an additional condition or obligation introduced in Document B.`
      });
      summaryInsights.push(`Clause present only in Document B: "${cat}" (${clauseB.clauseNumber}).`);
    }
  });

  // Check signatures / draft status
  if (docASigned && !docBSigned) {
    summaryInsights.push(`Status discrepancy: ${docA.fileName} is signed and executed, while ${docB.fileName} appears to be an unexecuted draft.`);
  } else if (!docASigned && docBSigned) {
    summaryInsights.push(`Status discrepancy: ${docA.fileName} appears to be an unexecuted draft, while ${docB.fileName} is signed and executed.`);
  }

  return {
    docA: { id: docA.id, name: docA.fileName, type: docA.docType, isSigned: docASigned },
    docB: { id: docB.id, name: docB.fileName, type: docB.docType, isSigned: docBSigned },
    isTypeMismatch,
    typeMismatchWarning,
    categories,
    summaryInsights
  };
}
