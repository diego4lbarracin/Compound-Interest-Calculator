package models

// ETF_Information represents the structure of ETF data
type ETF_Information struct {
    EtfSymbol      string  `json:"etf_symbol"`
    EtfName        string  `json:"etf_name"`
    EtfAvgReturn   float64 `json:"etf_avg_return"`
    EtfDescription string  `json:"etf_description"`
}

// ETFInformationResponse is the API response wrapper
type ETFInformationResponse struct {
    Success bool              `json:"success"`
    Data    []ETF_Information `json:"data,omitempty"`
    Count   int               `json:"count,omitempty"`
    Error   string            `json:"error,omitempty"`
}