package models

type Interest_Calculation struct {
	//Compounding period (year 1, 2, 3, ...).
	Year int `json:"year"`
	//Current principal amount: initial investment + total contributions for that period.
	Current_principal float64 `json:"current_principal"`
	//Interest earned during that period.
	Interest_earned float64 `json:"interest_earned"`
	//Total amount at the end of that period. (current principal + interest earned)
	Total_amount float64 `json:"total_amount"`
}
