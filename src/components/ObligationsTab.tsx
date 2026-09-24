import React, { useState } from 'react';
import { Clock, Calculator, AlertCircle, CheckCircle2, Calendar, ArrowRight, Info } from 'lucide-react';
import { DocumentData, SupportedLanguage, ObligationItem } from '../types';
import { extractObligationsFromDocument, computeEventDeadline } from '../services/obligationTracker';
import { TRANSLATIONS } from '../services/localization';

interface ObligationsTabProps {
  document: DocumentData;
  currentLanguage: SupportedLanguage;
}

export const ObligationsTab: React.FC<ObligationsTabProps> = ({
  document,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [obligations, setObligations] = useState<ObligationItem[]>(() =>
    extractObligationsFromDocument(document)
  );

  // Dynamic Event Calculator State
  const [selectedEventId, setSelectedEventId] = useState<string>(() => {
    const eventItem = obligations.find(o => o.isEventTriggered);
    return eventItem ? eventItem.id : '';
  });
  const [inputEventDate, setInputEventDate] = useState<string>(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });

  const selectedObligation = obligations.find(o => o.id === selectedEventId);

  const calculatedResult = selectedObligation && selectedObligation.offsetDays !== undefined
    ? computeEventDeadline(inputEventDate, selectedObligation.offsetDays)
    : null;

  const toggleStatus = (id: string) => {
    setObligations(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextStatus = item.status === 'completed' ? 'pending' : 'completed';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  return (
    <div className="tab-pane obligations-tab">
      <div className="tab-header-row">
        <div>
          <h2 className="tab-heading">{t.obligations.title}</h2>
          <p className="tab-subheading">{t.obligations.subtitle}</p>
        </div>
      </div>

      {/* Interactive Event-Based Calculator Card */}
      <div className="calculator-card">
        <div className="calc-header">
          <div className="calc-title-wrap">
            <Calculator size={22} className="calc-icon" />
            <div>
              <h3 className="calc-title">{t.obligations.calculatorTitle}</h3>
              <p className="calc-subtitle">
                Transparently calculate exact dates for dynamic deadlines that depend on an event (e.g. receipt of notice, resignation, handover).
              </p>
            </div>
          </div>
        </div>

        <div className="calc-body-grid">
          <div className="calc-controls">
            <label className="input-label">Select Dynamic Contract Obligation:</label>
            <select
              className="calc-select"
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
            >
              {obligations
                .filter(o => o.isEventTriggered)
                .map(o => (
                  <option key={o.id} value={o.id}>
                    {o.party}: {o.obligation.slice(0, 50)}... ({o.eventTrigger || 'Event'})
                  </option>
                ))}
              {obligations.filter(o => o.isEventTriggered).length === 0 && (
                <option value="">No event-triggered deadlines in this contract</option>
              )}
            </select>

            {selectedObligation && (
              <>
                <label className="input-label" style={{ marginTop: '1rem' }}>
                  {t.obligations.enterEventDate}
                </label>
                <div className="date-input-wrap">
                  <Calendar size={18} className="cal-input-icon" />
                  <input
                    type="date"
                    className="calc-date-input"
                    value={inputEventDate}
                    onChange={(e) => setInputEventDate(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="calc-result-display">
            {selectedObligation && calculatedResult ? (
              <div className="calc-outcome-box">
                <div className="outcome-header">
                  <span className="outcome-formula">
                    {selectedObligation.eventTrigger} ({inputEventDate}) {selectedObligation.offsetDays && selectedObligation.offsetDays >= 0 ? `+ ${selectedObligation.offsetDays} days` : `${selectedObligation.offsetDays} days`}
                  </span>
                  <span className="clause-ref-tag">{selectedObligation.clauseRef}</span>
                </div>

                <div className="outcome-target-date">
                  <div className="label">{t.obligations.deadlineLabel}</div>
                  <div className="big-date">{calculatedResult.formattedDate}</div>
                </div>

                <div className={`countdown-chip ${calculatedResult.daysRemaining < 5 ? 'urgent' : ''}`}>
                  <Clock size={15} />
                  <span>
                    {calculatedResult.daysRemaining > 0
                      ? `${calculatedResult.daysRemaining} days remaining from today`
                      : calculatedResult.daysRemaining === 0
                      ? 'Deadline is TODAY'
                      : `${Math.abs(calculatedResult.daysRemaining)} days passed`}
                  </span>
                </div>

                <p className="calculation-explanation">
                  <strong>Calculation Formula:</strong> Computed strictly according to {selectedObligation.clauseRef}. If the final day falls on a court holiday or Sunday, consult local statutory rules regarding expiration on the next working day.
                </p>
              </div>
            ) : (
              <div className="calc-placeholder">
                <Info size={28} />
                <p>Select an obligation and pick the triggering event date to compute the target deadline.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Obligations Table */}
      <div className="obligations-table-container">
        <h3 className="section-subheading">Contractual Obligations Breakdown</h3>
        <div className="table-responsive">
          <table className="obligations-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Responsible Party</th>
                <th>Obligation / Action Required</th>
                <th>Stated Deadline / Timeline</th>
                <th>Clause</th>
                <th>Conditions & Notes</th>
              </tr>
            </thead>
            <tbody>
              {obligations.map((item) => (
                <tr key={item.id} className={item.status === 'completed' ? 'row-done' : ''}>
                  <td>
                    <button
                      className={`status-toggle-btn ${item.status}`}
                      onClick={() => toggleStatus(item.id)}
                      title="Click to toggle status"
                    >
                      {item.status === 'completed' ? (
                        <>
                          <CheckCircle2 size={16} />
                          <span>Done</span>
                        </>
                      ) : item.status === 'urgent' ? (
                        <>
                          <AlertCircle size={16} />
                          <span>Urgent</span>
                        </>
                      ) : (
                        <>
                          <Clock size={16} />
                          <span>Pending</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="party-cell">
                    <strong>{item.party}</strong>
                  </td>
                  <td className="obligation-cell">
                    {item.obligation}
                    {item.isEventTriggered && (
                      <span className="event-pill">
                        Event: {item.eventTrigger} ({item.offsetDays}d)
                      </span>
                    )}
                  </td>
                  <td className="deadline-cell">
                    <span className="deadline-badge">{item.deadline}</span>
                  </td>
                  <td className="clause-cell">
                    <span className="clause-code">{item.clauseRef}</span>
                  </td>
                  <td className="condition-cell">
                    {item.condition || 'Standard performance terms'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
