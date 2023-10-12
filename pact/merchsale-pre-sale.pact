(namespace "free")

(define-keyset "free.kadena-merch-token-admin" (read-keyset "kadena-merch-token-admin"))
(module merchsale-pre-sale MERCH

  (use util.guards)

  (defschema reservation
    account:string
    guard:guard
    amount-kda:decimal
    amount-merch:integer)

  (defschema whitelist-schema
    account:[string]
  )

  (defschema sale
    status:string
    price:decimal)

  (deftable reservations:{reservation})
  (deftable whitelists:{whitelist-schema})
  (deftable sale-status:{sale})


  (defcap MERCH ()
    (enforce-guard (keyset-ref-guard "free.kadena-merch-token-admin")))

  (defcap OPS ()
    (enforce-guard
      (keyset-ref-guard  "free.kadena-merch-token-admin")))

 (defcap RESERVE
   ( account:string
     amount-kda:decimal
     amount-merch:integer)
    "Reserve event for merch reservation"
    @event
    (enforce-guard (before-date END_TIME))
    (enforce-one "Sale Not Started"
      [(enforce-guard (at-after-date SALE_START_TIME))
       (enforce-guard (at-after-date WHITELIST_TIME))])
       (let* ( (total-merch-reserved:decimal (get-total-merch-reserved))
               (merch-reserved:integer (get-merch-reserved account))
               (sale-price:decimal (* amount-merch (get-sale-price))))
             (enforce
               (= amount-kda sale-price)
               (format "Invalid KDA/Merch amount {} KDA and {} Merch {}" [sale-price amount-merch amount-kda]))
             (enforce
               (<= (+ amount-merch total-merch-reserved) KRYPTOMERCH_SALE_SUPPLY)
               (format "Reachecd maximum supply {} for private-sale" [KRYPTOMERCH_SALE_SUPPLY]))
             (enforce
               (<= (+ amount-merch merch-reserved) KRYPTOMERCH_PER_USER)
               (format "You can buy only {} tokens" [KRYPTOMERCH_PER_USER]))
        )
    )


 (defconst KRYPTOMERCH_BANK:string "merch-bank")
 (defconst KRYPTOMERCH_PER_USER:integer 5)
 (defconst KRYPTOMERCH_SALE_SUPPLY:decimal 5.0)
 ;;will enter the sale-start time later
 (defconst SALE_START_TIME:time (time "2022-08-01T15:30:33Z"))
 ;;will enter the whitelist time later
 (defconst WHITELIST_TIME:time (time "2022-08-09T15:30:33Z"))
 ;;will enter the sale-end time later
 (defconst END_TIME:time (time "2022-10-11T15:30:33Z"))
 (defconst SALE_STATUS:string "sale-status")
 (defconst SALE_PAUSED "sale-paused")
 (defconst SALE_STARTED "sale-started")


 (defun init (accounts:[string])
     (with-capability (MERCH)
       (coin.create-account "merch-bank" (create-module-guard "Kryptomerch-bank"))
       (insert whitelists "" {
         'account: accounts
         })
       (insert sale-status SALE_STATUS {
         'status: SALE_STARTED,
         'price: 0.0
       })
     )
   )

   (defun enforce-whitelist (account)
     (let ( (accounts:[string] (at 'accounts (read whitelists ""))))
       (enforce (contains account accounts) "You are not whitelisted")
       (enforce-guard (at-after-date WHITELIST_TIME))
       (enforce-guard (at-before-date SALE_START_TIME))
     )
   )

   (defun reserve:string (account:string amount-kda:decimal amount-merch:integer)
     (enforce (<= 0 amount-merch) "amount-merch must atleast be 1")
     (with-capability (RESERVE account amount-kda amount-merch)
       (if (< (diff-time (at 'block-time (chain-data)) SALE_START_TIME) 0.0) (enforce-whitelist account) "Pre-sale for whitelists ended")
       (coin.transfer account KRYPTOMERCH_BANK amount-kda)
       (let
         ( (g (at 'guard (coin.details account)))
           (kda-amount:decimal (+ amount-kda (get-amount-kda account)))
           (merch-amount:integer (+ amount-merch (get-merch-reserved account))))
         (write reservations account
           { "account"    : account
           , "amount-kda" : kda-amount
           , "amount-merch" : merch-amount
           , "guard"      : g
           })
         (format "{} reserved KRYPTOMERCH with {} KDA" [account, amount-kda])
       )
     )
   )

   (defun update-sale-price:string (price:decimal)
     @doc   "Update sale price - Simplified oracle to handle on-chain reservation"
     (enforce (< 0.0 price) "price is not a positive number")
       (with-capability (MERCH)
         (with-read sale-status SALE_STATUS {
           "price":=oldPrice}
             (update sale-status SALE_STATUS {"price":price})
               (format "Kda/Usd sale price updated: old price {} | new price {}" [oldPrice, price])
         )
       )
   )

   (defun get-sale-price:decimal ()
     (at 'price (read sale-status SALE_STATUS))
   )

   (defun read-reservation (account:string)
     (read reservations account)
   )

   (defun get-accounts ()
     (keys reservations)
   )

   (defun get-total-merch-reserved:decimal ()
     (fold (+) 0.0 (map (get-merch-reserved) (get-accounts)))
   )

   (defun get-total-kda-reserved:decimal ()
     (fold (+) 0.0 (map (get-amount-kda) (get-accounts)))
   )

   (defun get-amount-kda:decimal (account:string)
     (with-default-read reservations account
       { 'amount-kda: 0.0 }
       { 'amount-kda:= amount }
       amount
     )
   )

   (defun get-merch-reserved:integer (account:string)
     (with-default-read reservations account
       { 'amount-merch: 0 }
       { 'amount-merch:= amount }
       amount
     )
   )

   (defun get-start-time:time ()
     SALE_START_TIME
   )

   (defun get-whitelist-time:time ()
     WHITELIST_TIME
   )

   (defun get-end-time:time ()
     END_TIME
   )

   (defun get-sale-supply:decimal ()
     KRYPTOMERCH_SALE_SUPPLY
   )

   (defun get-merch-per-user:decimal ()
     KRYPTOMERCH_PER_USER
   )

  )

;  (if (read-msg 'upgrade)
;      ["upgrade completed"]
;      [ (create-table reservations)
;       (create-table whitelists)
;       (create-table sale-status)
;       (init (read-msg 'accounts))
;       ])


(create-table whitelists)
(create-table sale-status)
(create-table reservations)
