"use client";

import React, { useState } from "react";
import "./faq.css";

interface AccordionItem {
  id: number;
  title: string;
  content: string;
  expanded: boolean;
}

const FAQ: React.FC = () => {
  const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([
    {
      id: 1,
      title: "How does the bidding process work on your website?",
      content:
        "The bidding process involves placing monetary offers on vehicles. The highest bid at the auctions end wins.",
      expanded: false,
    },
    {
      id: 2,
      title:
        "What types of vehicles are available for bidding on your website?",
      content:
        "We offer a variety of vehicles for bidding, including cars, trucks, and more. ",
      expanded: false,
    },
    {
      id: 3,
      title:
        "What is the bidding increment, and how does it affect the auction?",
      content:
        " The bidding increment is the minimum amount by which a bid must increase. It ensures a fair and structured auction.",
      expanded: false,
    },
    {
      id: 4,
      title: "Is there a reserve price, and how does it influence the auction?",
      content:
        "Yes, there may be a reserve price. If its not met, the item wont be sold. It encourages competitive bidding.",
      expanded: false,
    },
    {
      id: 5,
      title:
        "What measures are in place to ensure the security and authenticity?",
      content:
        "We employ strict security measures and authentication processes to guarantee a safe and genuine auction environment.",
      expanded: false,
    },
    {
      id: 6,
      title:
        "Are there any buyer s premiums or additional fees associated with winning a bid?",
      content:
        "Yes, winning bids may have buyers premiums or additional fees. Its important to check the terms and conditions for details.",
      expanded: false,
    },
  ]);

  const toggleAccordion = (id: number) => {
    setAccordionItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  return (
    <div>
      {" "}
      <div className="container">
        <div className="content_cart">
          <div className="cartt">
            <h4 className="page_cart">Home / FAQ</h4>
            <h3 className="title_cart">FAQ</h3>
          </div>
        </div>
        <h2 className="f">Frequently Asked Questions</h2>
        <div className="vc_tta-panel-heading">
          {accordionItems.map((item) => (
            <div className="accordion-item buttone" key={item.id}>
              <button
                onClick={() => toggleAccordion(item.id)}
                aria-expanded={item.expanded}
              >
                <span className="accordion-title">{item.title}</span>
                <span className="icon" aria-hidden="true"></span>
              </button>
              {item.expanded && (
                <div className="accordion-content">
                  <p>{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
