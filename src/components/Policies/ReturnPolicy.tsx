// Return policy section rendered inside the policies page.
import React from "react";

const ReturnPolicy: React.FC = () => {
  return (
    <section id="return-policy" className="policy-section">
      <h1>Return Policy</h1>
      <p>
        This site does not currently accept orders or checkout submissions.
        Historical commission work is shown for archive and portfolio purposes.
      </p>
      <h3>Current Status</h3>
      <p>
        Because commissions are paused, there is no active return flow through
        this website.
      </p>
      <h3>Past Work</h3>
      <p>
        For questions about previous work, contact support@gleworks.io.vn.
      </p>
    </section>
  );
};

export default ReturnPolicy;
