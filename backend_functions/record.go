package function

import (
	"time"

	"github.com/go-playground/validator"
)

type Record struct {
	Barcode   string    `json:"barcode" validate:"required"`
	GrindSize float64   `json:"grind" validate:"required"`
	In        float64   `json:"in" validate:"required"`
	OUt       float64   `json:"out" validate:"required"`
	Seconds   float64   `json:"seconds" validate:"required"`
	UserId    string    `json:"userId"`
	Created   time.Time `json:"created"`
}

func (a Record) Validate() (errs validator.ValidationErrors) {
	v := validator.New()

	err := v.Struct(a)

	if err == nil {
		return nil
	}

	return v.Struct(a).(validator.ValidationErrors)
}
