package function

import (
	"encoding/json"
	"net/http"

	"google.golang.org/appengine"
)

func Search(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	if HandleCors(w, r) {
		return
	}

	id, err := VerifyToken(r)

	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	barcode := r.URL.Query()["barcode"]

	if barcode == nil || len(barcode) < 1 {
		http.Error(w, "barcode required", http.StatusBadRequest)
		return
	}

	result, err := SearchByBarcode(barcode[0], id, ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(result)
}
