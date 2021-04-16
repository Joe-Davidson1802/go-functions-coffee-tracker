package function

import (
	"context"
	"fmt"
	"log"
	"time"

	"cloud.google.com/go/datastore"
)

func getClient(ctx context.Context) (*datastore.Client, error) {
	client, err := datastore.NewClient(ctx, "plasma-myth-310415")

	if err != nil {
		log.Fatal(err)
		return client, err
	}

	return client, nil
}

func SearchByBarcode(bc string, id string, ctx context.Context) (results []Record, err error) {
	client, err := getClient(ctx)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	q := datastore.
		NewQuery("Record").
		Filter("Barcode =", bc).
		Filter("UserId =", id).
		Order("Created")

	var records []Record
	if _, err := client.GetAll(ctx, q, &records); err != nil {
		return nil, err
	}

	return records, nil
}

func PutRecord(r Record, ctx context.Context) (result Record, err error) {
	client, err := getClient(ctx)

	if err != nil {
		log.Fatal(err)
		return r, err
	}

	r.Created = time.Now().UTC()

	newKey := datastore.IncompleteKey("Record", nil)
	_, err = client.Put(ctx, newKey, &r)

	if err != nil {
		return r, err
	}

	log.Println(fmt.Sprintf("Created record at: %d", newKey.ID))

	return r, nil
}
