# Case 03 — LCC Domestic Return · 2A + 2C + 1I

| Field | Value |
|-------|-------|
| Type | LCC |
| Route | DEL ↔ BOM |
| Outbound Date | 2026-06-15 |
| Return Date | 2026-06-22 |
| Cabin | Economy |
| Passengers | 2 Adults + 2 Children + 1 Infant |
| Airline | IndiGo (6E) |
| Flow | Authenticate → Search (JT=2) → **[OB leg]** FareRule → FareQuote → Ticket → **[IB leg]** FareRule → FareQuote → Ticket → GetBookingDetails (×2) |

> **Domestic Return generates 2 separate PNRs** (one for OB, one for IB).
> TBO returns `Results[0][]` (OB) and `Results[1][]` (IB) from Search.
> All methods (FareRule, FareQuote, Ticket) must be called **separately** for OB then IB,
> using the respective ResultIndex from each leg.

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

## Step 2 — Search (JourneyType 2 = Return)

```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "AdultCount": "2",
  "ChildCount": "2",
  "InfantCount": "1",
  "DirectFlight": "false",
  "OneStopFlight": "false",
  "JourneyType": "2",
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

> Capture: `Response.TraceId` → `<<TRACE_ID>>` (same for both legs)
> Select a 6E OB result from `Results[0]` → `<<OB_RESULT_INDEX>>`
> Select a 6E IB result from `Results[1]` → `<<IB_RESULT_INDEX>>`

---

## Steps 3–5: Outbound Leg (OB)

### 3a — FareRule (OB)
```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<OB_RESULT_INDEX>>",
  "TraceId": "<<TRACE_ID>>"
}
```

### 4a — FareQuote (OB)
```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<OB_RESULT_INDEX>>",
  "TraceId": "<<TRACE_ID>>"
}
```
> Capture: `Response.TraceId` → `<<FQ_TRACE_OB>>`
> Capture: `FareBreakdown[]` for ADT, CHD, INF

### 5a — Ticket (OB)

```json
{
  "PreferredCurrency": "INR",
  "IsBaseCurrencyRequired": "true",
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "TraceId": "<<FQ_TRACE_OB>>",
  "ResultIndex": "<<OB_RESULT_INDEX>>",
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
        "BaseFare": "<<FareBreakdown[CHD].BaseFare / 2>>",
        "Tax": "<<FareBreakdown[CHD].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[CHD].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
      },
      "Baggage": [], "MealDynamic": [], "SeatDynamic": []
    },
    {
      "Title": "Miss", "FirstName": "RIYA", "LastName": "SHARMA",
      "PaxType": 2, "DateOfBirth": "2016-08-20T00:00:00", "Gender": 2,
      "PassportNo": "", "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[CHD].BaseFare / 2>>",
        "Tax": "<<FareBreakdown[CHD].Tax / 2>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[CHD].YQTax / 2>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
      },
      "Baggage": [], "MealDynamic": [], "SeatDynamic": []
    },
    {
      "Title": "Mstr", "FirstName": "KABIR", "LastName": "SHARMA",
      "PaxType": 3, "DateOfBirth": "2025-01-20T00:00:00", "Gender": 1,
      "PassportNo": "", "PassportExpiry": "2030-01-01T00:00:00",
      "AddressLine1": "45 Prithviraj Road", "City": "New Delhi",
      "CountryCode": "IN", "CountryName": "India", "Nationality": "IN",
      "Email": "", "ContactNo": "", "IsLeadPax": false,
      "GSTCompanyAddress": "", "GSTCompanyContactNumber": "",
      "GSTCompanyName": "", "GSTNumber": "", "GSTCompanyEmail": "",
      "Fare": {
        "Currency": "INR",
        "BaseFare": "<<FareBreakdown[INF].BaseFare / 1>>",
        "Tax": "<<FareBreakdown[INF].Tax / 1>>",
        "TaxBreakup": [], "YQTax": "<<FareBreakdown[INF].YQTax / 1>>",
        "AdditionalTxnFeeOfrd": 0, "AdditionalTxnFeePub": 0, "PGCharge": 0,
        "OtherCharges": 0, "ChargeBU": [], "Discount": 0, "PublishedFare": 0,
        "CommissionEarned": 0, "PLBEarned": 0, "IncentiveEarned": 0,
        "OfferedFare": 0, "TdsOnCommission": 0, "TdsOnPLB": 0,
        "TdsOnIncentive": 0, "ServiceFee": 0
      }
    }
  ]
}
```

> Capture: OB `BookingId` → `<<OB_BOOKING_ID>>`, OB `PNR` → `<<OB_PNR>>`

---

## Steps 3–5: Inbound Leg (IB) — repeat with IB_RESULT_INDEX

### 3b — FareRule (IB)
```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<IB_RESULT_INDEX>>",
  "TraceId": "<<TRACE_ID>>"
}
```

### 4b — FareQuote (IB)
```json
{
  "TokenId": "<<TOKEN>>",
  "EndUserIp": "1.1.1.1",
  "ResultIndex": "<<IB_RESULT_INDEX>>",
  "TraceId": "<<TRACE_ID>>"
}
```
> Capture: `Response.TraceId` → `<<FQ_TRACE_IB>>`

### 5b — Ticket (IB)
Same JSON structure as OB Ticket above, replacing:
- `TraceId`: `<<FQ_TRACE_IB>>`
- `ResultIndex`: `<<IB_RESULT_INDEX>>`
- Fares: from IB FareBreakdown
- `IsLeadPax`: `true` on first passenger (RAHUL SHARMA again)

> Capture: IB `BookingId` → `<<IB_BOOKING_ID>>`, IB `PNR` → `<<IB_PNR>>`

---

## Step 6 — GetBookingDetails (call for BOTH legs)

**OB:**
```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "BookingId": "<<OB_BOOKING_ID>>" }
```

**IB:**
```json
{ "TokenId": "<<TOKEN>>", "EndUserIp": "1.1.1.1", "BookingId": "<<IB_BOOKING_ID>>" }
```

---

## Case Summary

| Field | Value |
|-------|-------|
| OB ResultIndex | |
| IB ResultIndex | |
| TraceId (Search) | |
| OB PNR | |
| IB PNR | |
| OB BookingId | |
| IB BookingId | |
| Ticket Numbers (OB) | |
| Ticket Numbers (IB) | |
