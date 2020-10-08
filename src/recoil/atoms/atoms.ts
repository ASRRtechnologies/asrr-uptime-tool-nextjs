import { atom } from "recoil"

export const transactionListState = atom({
    key: "transactionListState",
    default: [
        {
            id:1,
        },
    ],
})