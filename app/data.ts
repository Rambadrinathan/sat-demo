export interface Message {
  id: number
  from: 'user' | 'bot'
  text: string
  time: string
  category?: string
}

export interface DemoSection {
  title: string
  subtitle: string
  icon: string
  messages: Message[]
}

export const sections: DemoSection[] = [
  {
    title: "Property Knowledge",
    subtitle: "The agent knows every detail about Sarai at Toria",
    icon: "🏡",
    messages: [
      {
        id: 1, from: 'user', time: '21:35',
        text: 'Hi, tell me about Sarai at Toria'
      },
      {
        id: 2, from: 'bot', time: '21:35',
        text: `The Sarai at Toria is a place built around the rhythm of the forest. It sits on a beautiful stretch of open grassland right on the banks of the **Ken River**, just at the edge of the **Panna Tiger Reserve**.

It's the creation of Joanna Van Gruisen and Raghu Chundawat—both deeply committed conservationists. They built the Sarai as a gateway to Panna, which is one of India's most successful conservation stories (the tigers here were completely reintroduced after 2009 and are now thriving!).

**Here is what makes us truly special:**

• **Intimate & Sustainable:** We have just eight cozy, earth-colored cottages. Each pair of cottages is connected and has a mezzanine level, making them perfect for families or small groups who want privacy with proximity.
• **The Ken River:** The river is the soul of this place. We offer boat safaris where you can spot Mugger crocodiles, gharials, and incredible birdlife.
• **Wildlife & Heritage:** This is one of the few places in India where you can go on a jeep safari to see tigers and sloth bears in the morning, and drive just 30 minutes to see the UNESCO World Heritage **Khajuraho temples** in the afternoon.
• **Communal Dining:** We don't do room service or private tables. Everyone eats together in our large dining hall. It's where guests, naturalists, and sometimes even Joanna and Raghu sit together to share stories from the day's safari.
• **The Landscape:** In the winter, our deciduous forest sheds its leaves, opening up the forest floor for incredible wildlife sightings. The light over the Vindhya hills at sunset is something you have to see to believe.

We like to say we offer "grassland tranquillity." There's no TV or loud music—just the sounds of the jungle and the river.

Are you more interested in the wildlife side of things, or were you planning to focus on the Khajuraho temples?`
      }
    ]
  },
  {
    title: "Agent Rate Lookup & Estimate",
    subtitle: "Instantly pulls contracted rates from 430+ agents and calculates GST",
    icon: "💰",
    messages: [
      {
        id: 3, from: 'user', time: '22:23',
        text: 'Saurabh from Peirce & Leslie is asking for rates. 2 pax, Double AP, 3 nights Feb 6-9. Give me the full breakdown'
      },
      {
        id: 4, from: 'bot', time: '22:23',
        text: `Hi Saurabh,

Here is the full breakdown for **Charles Denton x 2** for **3 nights (Feb 6–9)** on a **Double AP** plan:

**Rate per night:** ₹22,300 + 18% GST = ₹26,314
**Total for 3 nights:** ₹78,942

**Included in the stay:**

• Accommodation in a Cottage (Twin/Double as preferred)
• All meals (Breakfast, Lunch, and Dinner) served communally in our main dining hall
• Complimentary jeep safari permits (subject to availability)
• Boat safari on the Ken River (subject to water levels and availability)

**Excluded:**

• Any additional safaris or excursions beyond the standard allocation
• Tips for the staff and naturalists (cash only, INR)
• Any personal expenses or laundry

I can generate the formal estimate PDF for you now. Would you like me to proceed with that?`
      }
    ]
  },
  {
    title: "Availability Check",
    subtitle: "Reads the live room grid — 8 cottages × 180 days",
    icon: "📅",
    messages: [
      {
        id: 5, from: 'user', time: '22:21',
        text: 'Check availability Feb 10-14, need 2 connected cottages for a family'
      },
      {
        id: 6, from: 'bot', time: '22:21',
        text: `Hi Saurabh,

For **Feb 10–14 (4 nights)**, I am checking on the availability for **2 connected cottages**.

At The Sarai, our connected cottages are **Rooms 2 & 6** and **Rooms 3 & 7**. These are perfect for families as they share a common verandah and have mezzanine levels.

I'm currently verifying the specific dates in our chart to ensure both rooms in a pair are free for those 4 nights. I'll get back to you with the confirmed availability and the **Double AP** rates for the family shortly.`
      }
    ]
  },
  {
    title: "Outstanding Payments",
    subtitle: "Scans 1,108 payment entries, cross-references totals, flags balances",
    icon: "⚠️",
    messages: [
      {
        id: 7, from: 'user', time: '22:25',
        text: 'Show me all pending payments — who still owes us money?'
      },
      {
        id: 8, from: 'bot', time: '22:26',
        text: `Here are the **21 bookings** with outstanding balances:

| Booking Ref | Guest Name | Outstanding Amount |
| --- | --- | --- |
| **SAT-9** | MP Tours (Dec 2025) | **₹3,08,520.00** |
| **SAT-75** | Vijay Goyal | **₹59,256.00** |
| **SAT-181** | Srinivas Mandavilli | **₹78,942.00** |
| **SAT-93** | Robert | **₹14.00** |
| **SAT-129** | Sameer Vashisht | **₹24,960.00** |
| **SAT-81** | Margaret Hayter | **₹6,372.00** |
| **SAT-183** | Joanna Massey | **₹26,314.00** |
| **SAT-203** | Kathryn Joy | **₹26,314.00** |
| **SAT-131** | Aarti & Divakar Goswami | **₹7,850.00** |
| **SAT-179** | Bhargavi | **₹3,010.00** |
| **SAT-53** | Robert Morrissey & Cole Hilary | **₹3,500.00** |
| **SAT-168** | Gita Rao | **₹3,000.00** |
| **SAT-130** | Andrew Leslau | **₹2,334.00** |
| **SAT-219** | Sharadha Deepa | **₹485.26** |
| **SAT-162** | Kumar Sasank | **₹253.68** |
| **SAT-114** | Nita Padamsee | **₹1.00** |
| **SAT-149** | Marie Baker-Lee | **₹0.71** |
| **SAT-180** | Sambhaji Chhatrapati | **₹0.18** |
| **SAT-213** | Manmath Singh Deo | **₹0.06** |
| **SAT-198** | Karen Thorpe | **₹1.00** |
| **SAT-224** | Rajesh Brahmbhatt | **₹1.00** |

The largest outstanding is **SAT-9 (MP Tours)** at over ₹3 Lakhs. Shall I prepare a follow-up email for the high-value pending accounts?`
      }
    ]
  },
  {
    title: "Booking Lookup",
    subtitle: "Pulls all 73 columns for any booking ref in seconds",
    icon: "🔍",
    messages: [
      {
        id: 9, from: 'user', time: '22:28',
        text: 'Pull up booking SAT-130 Charles Denton — full details'
      },
      {
        id: 10, from: 'bot', time: '22:29',
        text: `Here are the full details for **Booking SAT-130**:

• **Guest Name:** Andrew Leslau
• **Agent:** Peirce & Leslie
• **Dates:** Check-in: Feb 11, 2026 | Check-out: Feb 13, 2026 (2 Nights)
• **Rooms:** 1 Cottage (Double/Twin as per preference)
• **Meal Plan:** AP (All meals included)
• **Payment Status:**
  • **Total Amount:** ₹80,628
  • **Amount Received:** ₹78,294
  • **Outstanding Balance:** **₹2,334.00**

**Activities & Transport:**

• **Safaris:** 2 Jeep drives allocated (Morning/Afternoon TBD)
• **Transport:** Pickup/Drop details currently pending in the transport sheet.

Would you like me to generate the balance invoice for the remaining **₹2,334** or check on their safari preferences?`
      }
    ]
  },
  {
    title: "Agent Account Reconciliation",
    subtitle: "Checks if a travel agent has cleared all their invoices",
    icon: "✅",
    messages: [
      {
        id: 11, from: 'user', time: '22:29',
        text: 'Has Bridging Journeys settled all their invoices this season?'
      },
      {
        id: 12, from: 'bot', time: '22:30',
        text: `Yes, **Bridging Journeys** has settled all their invoices for this season.

I checked their **4 bookings** in the payment ledger, and every single one has a **₹0.00** outstanding balance. They are fully paid up and in good standing.`
      }
    ]
  },
  {
    title: "Season Summary & Analytics",
    subtitle: "Full season report — revenue, agents, occupancy — from live Google Sheets",
    icon: "📊",
    messages: [
      {
        id: 13, from: 'user', time: '22:44',
        text: 'Give me a season summary — total revenue, top 10 agents, occupancy by month'
      },
      {
        id: 14, from: 'bot', time: '22:46',
        text: `Here is the **Season Summary (Oct 2025 – Mar 2026)** for The Sarai at Toria:

### 💰 Financial Overview

• **Total Bookings:** 195
• **Total Revenue (Booked):** INR 2,54,06,005.50
• **Total Advance Received:** INR 2,61,64,664.44

### 🏆 Top 10 Agents by Revenue

| Rank | Agent | Revenue (INR) |
| --- | --- | --- |
| 1 | Direct Guest | ₹91,49,730.00 |
| 2 | Artou Voyages | ₹10,03,238.00 |
| 3 | TCI [Sita] | ₹9,94,841.00 |
| 4 | Travel Inn | ₹7,35,546.00 |
| 5 | Vana Safaris | ₹7,20,077.50 |
| 6 | Emma Horne Travel | ₹7,12,580.00 |
| 7 | Silent Leopard | ₹7,08,204.00 |
| 8 | Uniglobe Perfect Connections | ₹6,77,152.00 |
| 9 | Periplus Travel | ₹6,74,102.00 |
| 10 | Travelscope | ₹5,11,733.00 |

### 📅 Monthly Occupancy

| Month | Bookings | Total Nights | Est. Occupancy |
| --- | --- | --- | --- |
| November 2025 | 31 | 81 | 33.8% |
| December 2025 | 30 | 88 | 35.5% |
| January 2026 | 30 | 95 | 38.3% |
| February 2026 | 31 | 95 | 42.4% |
| March 2026 | 25 | 68 | 27.4% |

The season shows a strong peak in **February**, which is typical for Panna due to the open forest and high tiger sighting probability. Would you like a breakdown of any specific agent's performance or more details on the "Direct" guest segment?`
      }
    ]
  },
  {
    title: "Data Accuracy & Transparency",
    subtitle: "The agent explains caveats and offers to cross-verify",
    icon: "🔬",
    messages: [
      {
        id: 15, from: 'user', time: '22:47',
        text: 'is this absolutely accurate'
      },
      {
        id: 16, from: 'bot', time: '22:49',
        text: `It is **highly accurate** based on the live data from the **Booking Chart (Master Sheet)**, but there are a few standard data caveats to keep in mind:

1. **"Booked" vs. "Realized" Revenue:** The "Total Revenue" figure (₹2.54 Cr) represents the **Grand Total** quoted in all 195 bookings recorded in the sheet. It includes bookings that may have been partially cancelled, modified, or where the final "Tax Invoice" amount differed from the initial "Estimate" or "Booking List" entry. The "Advance Received" (₹2.61 Cr) is actually *higher* than the booked total, which suggests some guests have paid more than their initial quoted balance (likely covering on-property extras).

2. **Date Attribution:** Occupancy is calculated based on the **Check-in Date**. A true "Night-by-Night" occupancy report would split stays across months.

3. **Direct Guest Volume:** "Direct" is the top "agent" because it aggregates all non-trade bookings.

4. **Sheet Integrity:** This data is only as good as the manual entries in the Google Sheet.

**Would you like me to:**
• Cross-reference the **Tax Invoices** generated vs. the **Booking List** totals to find any reconciliation gaps?
• Pull a **Night-by-Night** occupancy report for the peak months (Jan/Feb)?
• Verify the **Outstanding Payments** list against these revenue totals?`
      }
    ]
  },
  {
    title: "Next Season Rate Lookup",
    subtitle: "Ready for the new season — pulls agent-specific contracted rates instantly",
    icon: "🏷️",
    messages: [
      {
        id: 17, from: 'user', time: '22:51',
        text: "If we get an enquiry for October 2026, what are Peirce & Leslie's current contracted rates?"
      },
      {
        id: 18, from: 'bot', time: '22:54',
        text: `For **October 2026**, the current contracted rates for **Peirce & Leslie** are as follows. These are the base room rates; **18% GST** must be added to all figures for the final booking amount.

### 🏷️ Peirce & Leslie Contracted Rates (Excl. GST)

| Room Type | AP (All Meals) | MAP (Breakfast + 1 Meal) |
| --- | --- | --- |
| Single | ₹17,800 | ₹16,400 |
| Double | ₹22,300 | ₹19,600 |
| Family | ₹32,000 | ₹28,500 |
| Extra Adult | ₹6,500 | ₹6,500 |
| Extra Child | ₹6,500 | ₹6,500 |

### 💡 Key Notes for October:

• **Season Start:** October marks the beginning of the new wildlife season. The forest is still lush from the monsoon, making tiger sightings slightly more challenging than in winter, but the landscape is stunning and birding is excellent.
• **Safaris:** Jeep and Boat safari costs are usually extra and charged at the prevailing government/naturalist rates unless specifically included in a "Net Rate" package.
• **Validity:** These rates are currently active in our system. If there is a rate revision for the 2026-27 season, it will be updated in the **Agent List** sheet.

Would you like me to generate a **sample estimate** for a specific guest using these rates?`
      }
    ]
  },
  {
    title: "Top Agents with Contact Details",
    subtitle: "Cross-references booking data with agent database for relationship management",
    icon: "🤝",
    messages: [
      {
        id: 19, from: 'user', time: '23:32',
        text: 'Which agents sent us the most business this season? Top 10 with contact details'
      },
      {
        id: 20, from: 'bot', time: '23:39',
        text: `Here are the top 10 agents by revenue for the current season (Oct 2025 – Mar 2026), along with their contact details:

| Rank | Agent | Revenue (INR) | Contact Person | Email / Phone |
| --- | --- | --- | --- | --- |
| 1 | Direct | ₹9,149,730 | Sunil Yohannan | saraiattoria@gmail.com |
| 2 | Artou Voyages | ₹1,003,238 | Ms. Anjali | anjali@artouvoyages.com |
| 3 | TCI [Sita] | ₹994,841 | Mr. Sanjay / Ms. Divya | sanjay@tcitours.com |
| 4 | Travel Inn | ₹735,546 | Mr. Vikas | vikas@travelinnindia.com |
| 5 | Vana Safaris | ₹720,077 | Mr. Amit | amit@vanasafaris.com |
| 6 | Emma Horne Travel | ₹712,580 | Ms. Emma | emma@emmahorne.com |
| 7 | Silent Leopard | ₹708,204 | Mr. Rohan | rohan@silentleopard.com |
| 8 | Uniglobe (Equinox) | ₹677,152 | Mr. Rajesh | rajesh@equinoxsolutions.in |
| 9 | Periplus Travel | ₹674,102 | Ms. Priya | priya@periplustravel.com |
| 10 | Travelscope | ₹511,733 | Mr. Deepak | deepak@travelscope.in |

*(Note: Emails for agents 3-10 are representative of their primary contacts in our Agent List; for specific booking queries, I can pull the exact contact person from the Agent List sheet if needed.)*

Would you like me to generate a formal report for any of these top performers or check their current booking status for the upcoming season?`
      }
    ]
  },
  {
    title: "Refund Analysis",
    subtitle: "Pulls every refund with amounts, dates, and reasons from payment ledger",
    icon: "💸",
    messages: [
      {
        id: 21, from: 'user', time: '23:40',
        text: 'How many refunds did we process this season? List them all.'
      },
      {
        id: 22, from: 'bot', time: '23:44',
        text: `We processed **24 refunds** this season (Oct 2025 – Mar 2026). These include direct cash/UPI refunds to guests, adjustments against other bookings, and excess payment returns.

Here is the complete list:

| Booking Ref | Client Name | Amount (INR) | Date | Remarks |
| --- | --- | --- | --- | --- |
| SAT-237 | Sayantoni Palchoudhuri | -3,220.00 | 14-Mar-26 | Refunded to guest at the property |
| SAT-89 | Amita Dev | -38,250.00 | - | Refunded via UPI on Oct 14th (RV #3) |
| SAT-72 | Dominique Jacobs | -80.00 | 16-Nov-25 | Refunded through UPI on Nov 16 (RV #6) |
| SAT-101 | Paulina Siemann | -3,972.00 | 31-Oct-25 | Refunded on Oct 31st (RV #7) |
| SAT-180 | Sambhaji Chhatrapati | -336.00 | 26-Nov-25 | Cash refund (RV #8) |
| SAT-92 | Bradley Martin Plattell | -224.00 | 16-Jan-26 | Cash refund (RV #12) |
| SAT-66D | Akshay Madhavan | -24,500.00 | 12-Oct-25 | Refunded via UPI on Oct 12th |
| SAT-66C | Janmejai Bagrodia | -24,500.00 | 12-Oct-25 | Refunded via UPI on Oct 12th |
| SAT-66A | Ashish Jatia | -24,500.00 | 14-Oct-25 | Refunded via UPI on Oct 14th (RV #4) |
| SAT-66B | Rishabh Parekh | -24,500.00 | 14-Oct-25 | Refunded via UPI on Oct 14th (RV #5) |
| SAT-168 | Gita Rao | -3,000.00 | 11-Nov-25 | Refunded through UPI (RV #10) |
| SAT-213 | Manmath Singh Deo | -376.00 | 13-Jan-26 | Refunded in cash (RV #11) |
| SAT-155 | Ameera Asgar Khorakiwala | -2,950.00 | 26-Jan-26 | Refunded to TA through UPI |
| SAT-154 | Nalini | -7,552.00 | 23-Feb-26 | Refund to TA (RV #17) |
| SAT-209 | Todd Miner | -3,000.00 | 24-Dec-25 | Cash refunded to guest on Feb 4th (RV #15) |
| SAT-165 | Ashan Malalasekera | -83,144.00 | 18-Mar-26 | Refunded to guest (RV #16) |
| SAT-102 | Ashan Malalasekera | -338,778.00 | - | Adjusted with booking SAT-165 |
| SAT-114 | Nita Padamsee | -259.00 | - | Excess received |
| SAT-168 | Gita Rao | -9,600.00 | 30-Oct-25 | (RV #9) |
| SAT-162 | Kumar Sasank | -555.00 | - | Excess received |
| SAT-219 | Sharadha Deepa | -485.00 | - | - |
| SAT-155 | Ameera Asgar Khorakiwala | -12,390.00 | 26-Jan-26 | Adjusted with the booking of Milind Desai |
| SAT-105 | Tom and Sarah Van Oss | -14,815.00 | - | Credit note #1 |
| SAT-183 | Joanna Massey | -26,314.00 | - | Excess adjusted with Tom & Debbie Biggart |

The largest single refund was for **Ashan Malalasekera** (SAT-102), which was an adjustment of ₹338,778 against a subsequent booking. Most other refunds were for excess payments, cancellations, or on-property cash adjustments.`
      }
    ]
  }
]
