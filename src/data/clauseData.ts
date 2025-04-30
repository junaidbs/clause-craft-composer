
import { v4 as uuidv4 } from 'uuid';

export const clauseCategories = [
  {
    id: "general",
    title: "General Clauses",
    clauses: [
      {
        id: uuidv4(),
        title: "Introduction",
        content: "This agreement is made on {{date}} between {{party1}}, hereinafter referred to as 'Client', and {{party2}}, hereinafter referred to as 'Provider'.",
        category: "general"
      },
      {
        id: uuidv4(),
        title: "Definitions",
        content: "In this agreement, unless the context otherwise requires:\n\n'Agreement' means this document including any schedules and annexes.\n'Services' means the services described in Schedule {{schedule_number}}.\n'Term' means the period commencing on {{start_date}} and ending on {{end_date}}.",
        category: "general"
      },
      {
        id: uuidv4(),
        title: "Notices",
        content: "Any notice given under this Agreement must be in writing and may be delivered personally or sent by email to the address of the recipient specified in this Agreement or as otherwise notified by one party to the other from time to time.",
        category: "general"
      }
    ]
  },
  {
    id: "payment",
    title: "Payment Terms",
    clauses: [
      {
        id: uuidv4(),
        title: "Payment Schedule",
        content: "Client agrees to pay Provider the sum of {{payment_amount}} according to the following schedule: {{payment_schedule}}.",
        category: "payment"
      },
      {
        id: uuidv4(),
        title: "Late Payment",
        content: "If Client fails to make any payment when due, Provider may charge interest on the outstanding amount at the rate of {{interest_rate}}% per annum calculated daily from the due date until payment is received in full.",
        category: "payment"
      },
      {
        id: uuidv4(),
        title: "Taxes",
        content: "All fees are exclusive of applicable taxes. Client shall be responsible for payment of all applicable taxes, including but not limited to sales tax, GST, VAT, or other similar taxes that may apply in Client's jurisdiction.",
        category: "payment"
      }
    ]
  },
  {
    id: "termination",
    title: "Termination Clauses",
    clauses: [
      {
        id: uuidv4(),
        title: "Termination for Convenience",
        content: "Either party may terminate this Agreement for any reason upon providing {{notice_period}} days' written notice to the other party.",
        category: "termination"
      },
      {
        id: uuidv4(),
        title: "Termination for Breach",
        content: "If either party breaches any provision of this Agreement and fails to remedy such breach within {{remedy_period}} days after receiving written notice of the breach, the non-breaching party may terminate this Agreement immediately upon written notice.",
        category: "termination"
      },
      {
        id: uuidv4(),
        title: "Effect of Termination",
        content: "Upon termination of this Agreement for any reason: (a) Client shall pay Provider all fees due and payable up to the effective date of termination; (b) Provider shall return all Client materials and data; and (c) the provisions of Sections {{surviving_sections}} shall survive such termination.",
        category: "termination"
      }
    ]
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    clauses: [
      {
        id: uuidv4(),
        title: "Definition of Confidential Information",
        content: "'Confidential Information' means all information disclosed by one party (the 'Disclosing Party') to the other party (the 'Receiving Party'), in any form, that is designated as confidential or would reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure.",
        category: "confidentiality"
      },
      {
        id: uuidv4(),
        title: "Non-disclosure Obligations",
        content: "The Receiving Party shall: (a) use the Confidential Information only for the purposes of this Agreement; (b) protect the Confidential Information using at least the same degree of care it uses to protect its own confidential information, but no less than reasonable care; and (c) limit access to the Confidential Information to those of its employees, contractors, and agents who need such access for purposes consistent with this Agreement and who are bound by confidentiality obligations at least as restrictive as those in this Agreement.",
        category: "confidentiality"
      },
      {
        id: uuidv4(),
        title: "Exclusions",
        content: "The obligations in this section shall not apply to information that: (a) was rightfully known to the Receiving Party without restriction before receipt from the Disclosing Party; (b) is or becomes publicly available through no fault of the Receiving Party; (c) is rightfully received by the Receiving Party from a third party without a duty of confidentiality; or (d) is independently developed by the Receiving Party without use of or reference to the Disclosing Party's Confidential Information.",
        category: "confidentiality"
      }
    ]
  },
  {
    id: "intellectual_property",
    title: "Intellectual Property",
    clauses: [
      {
        id: uuidv4(),
        title: "Ownership of Pre-existing IP",
        content: "Each party shall retain all rights, title, and interest in and to its pre-existing intellectual property. Nothing in this Agreement shall be construed as transferring ownership of either party's pre-existing intellectual property to the other party.",
        category: "intellectual_property"
      },
      {
        id: uuidv4(),
        title: "Assignment of Deliverables",
        content: "Subject to payment of all fees due under this Agreement, Provider hereby assigns to Client all right, title, and interest in and to the deliverables specifically created by Provider for Client under this Agreement.",
        category: "intellectual_property"
      },
      {
        id: uuidv4(),
        title: "License Grant",
        content: "Provider grants to Client a non-exclusive, non-transferable license to use Provider's {{licensed_materials}} solely for the purposes of {{license_purpose}} during the term of {{license_term}}.",
        category: "intellectual_property"
      }
    ]
  }
];
