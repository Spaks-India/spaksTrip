# Case 06 — LCC Domestic Special Return · 2A + 1C

| Field | Value |
|-------|-------|
| Type | LCC Special Return |
| Route | DEL ↔ BOM |
| Outbound Date | 2026-06-15 |
| Return Date | 2026-06-22 |
| Cabin | Economy |
| Passengers | 2 Adults + 1 Child |
| Airline | IndiGo (6E) |
| Flow | Authenticate → Search (JT=5) → FareRule → **FareQuote (OB+IB comma-separated)** → Ticket → GetBookingDetails |

> **Special Return rule (JourneyType=5)**:
> - Search returns OB and IB results in `Results[0]` and `Results[1]`.
> - FareQuote receives both ResultIndexes as comma-separated: `"ResultIndex": "OB_INDEX,IB_INDEX"`.
> - FareQuote returns a **single OB ResultIndex** in response.
> - Ticket and all subsequent calls use only the **OB ResultIndex**.
> - **One PNR** is generated (covers both legs).

---

## Step 1 — Authenticate

```json
{
  "ClientId": "ApiIntegrationNew",
  "UserName": "<<TBO_USERNAME>>",
  "Password": "<<TBO_PASSWORD>>",
  "EndUserIp": "1.1.1.1"
}
```

---

## Step 2 — Search (JourneyType 5 = Special Return)

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "AdultCount": "2",
  "ChildCount": "1",
  "InfantCount": "0",
  "DirectFlight": "false",
  "OneStopFlight": "false",
  "JourneyType": "5",
  "PreferredAirlines": null,
  "Segments": [
    {
      "Origin": "DEL",
      "Destination": "BOM",
      "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-06-15T00:00:00",
      "PreferredArrivalTime": "2026-06-15T00:00:00"
    },
    {
      "Origin": "BOM",
      "Destination": "DEL",
      "FlightCabinClass": "2",
      "PreferredDepartureTime": "2026-06-22T00:00:00",
      "PreferredArrivalTime": "2026-06-22T00:00:00"
    }
  ],
  "Sources": null
}
```

> Capture: `Response.TraceId` → `<<TRACE_ID>>`
> Select a 6E OB result from `Results[0]` → `<<OB_RESULT_INDEX>>`
> Select a 6E IB result from `Results[1]` → `<<IB_RESULT_INDEX>>`

---

## Step 3 — FareRule (OB only)

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<OB_RESULT_INDEX>>",
  "TraceId": "<<TRACE_ID>>"
}
```

---

## Step 4 — FareQuote (comma-separated OB,IB)

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<OB_RESULT_INDEX>>,<<IB_RESULT_INDEX>>",
  "TraceId": "<<TRACE_ID>>"
}
```

> Response returns a **single OB ResultIndex** — capture it → `<<FQ_RESULT_INDEX>>`
> Capture: `Response.TraceId` → `<<FQ_TRACE_ID>>`
> All subsequent calls use `<<FQ_RESULT_INDEX>>` (not the original OB index).

---

## Step 5 — Ticket (LCC — use FQ_RESULT_INDEX)

```json
{
  "PreferredCurrency": "INR",
  "IsBaseCurrencyRequired": "true",
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "TraceId": "<<FQ_TRACE_ID>>",
  "ResultIndex": "<<FQ_RESULT_INDEX>>",
  "Passengers": [
    {
      "Title": "Mr", "FirstName": "RAHUL", "LastName": "SHARMA",
      "PaxType": 1, "DateOfBirth": "1985-03-15T00:00:00", "Gender": 1,
      "PassportNo": "", "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "rahul.sharma@example.com", "ContactNo": "9810001234",
      "IsLeadPax": true,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>",
        "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[ADT].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
      },
      "Baggage": [], "MealDynamic": [], "SeatDynamic": []
    },
    {
      "Title": "Mrs", "FirstName": "PRIYA", "LastName": "SHARMA",
      "PaxType": 1, "DateOfBirth": "1988-07-22T00:00:00", "Gender": 2,
      "PassportNo": "", "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[ADT].BaseFare / 2>>",
        "Tax": "<<FareBreakdown[ADT].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[ADT].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
      },
      "Baggage": [], "MealDynamic": [], "SeatDynamic": []
    },
    {
      "Title": "Mstr", "FirstName": "ROHAN", "LastName": "SHARMA",
      "PaxType": 2, "DateOfBirth": "2017-05-10T00:00:00", "Gender": 1,
      "PassportNo": "", "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[CHD].BaseFare / 1>>",
        "Tax": "<<FareBreakdown[CHD].Tax / 1>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[CHD].YQTax / 1>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
      },
      "Baggage": [], "MealDynamic": [], "SeatDynamic": []
    }
  ]
}
```

---

## Step 6 — GetBookingDetails

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "BookingId": "<<BOOKING_ID>>"
}
```

---

## Case Summary

| Field | Value |
|-------|-------|
| OB ResultIndex | |
| IB ResultIndex | |
| FQ ResultIndex (returned by FareQuote) | |
| TraceId (Search) | |
| TraceId (FareQuote) | |
| PNR (single — special return) | |
| BookingId | |
| Ticket Numbers | |
