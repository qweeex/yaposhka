import Axios from "axios";
import GetDetailsResponse from "@/struct/GetDetailsResponse";
import ProductBase from "@/struct/ProductBase";
import UIRepository from "@/repositories/ui-repository";
import CartBase from "@/struct/CartBase";
import HistoryBase from "@/struct/HistoryBase";
import SaleItem from "@/struct/SaleItem";
import AddrItem from "@/struct/AddrItem";

class DataRepository {
    public static CurrentSaleArray: SaleItem[] = []
    public static CurrentAddrArray: AddrItem[] = []
    public static CurrentProductBase?: ProductBase
    public static readonly CurrentCartBase: CartBase = new CartBase()
    public static readonly CurrentHistoryBase: HistoryBase = new HistoryBase()

    public static DoInitDetails(): void {
        try {
            const localStorageProducts = localStorage.getItem("products")
            if (localStorageProducts !== null) {
                this.OnIncomingDetailsResponse(JSON.parse(localStorageProducts))
            }
        } catch (e) {
            alert("Exception in DoInitDetails::Local: " + e)
        }
        try {
            const localStorageSales = localStorage.getItem("sales")
            if (localStorageSales !== null) {
                DataRepository.CurrentSaleArray = JSON.parse(localStorageSales)
            }
        } catch (e) {
            alert("Exception in DoInitDetails2::Local: " + e)
        }
        try {
            const localStorageAddrs = localStorage.getItem("addrs")
            if (localStorageAddrs !== null) {
                DataRepository.CurrentAddrArray = JSON.parse(localStorageAddrs)
            }
        } catch (e) {
            alert("Exception in DoInitDetails2::Local: " + e)
        }
        try {
            Axios.get('https://yaposhka64.ru/api/getdetails.json', {
                headers: {
                    "CheckMobileApp": "true"
                }
            }).then(result => {
                const detailsResponse: GetDetailsResponse = (result.data as GetDetailsResponse)
                localStorage.setItem("products", JSON.stringify(detailsResponse))
                this.OnIncomingDetailsResponse(detailsResponse)
            }).catch((err) => {
                alert("Error in DoInitDetails::Remote: " + err)
            })
        } catch (e) {
            alert("Exception in DoInitDetails::Remote: " + e)
        }
        try {
            Axios.get('https://yaposhka64.ru/getstocks.json', {
                headers: {
                    "CheckMobileApp": "true"
                }
            }).then(result => {
                DataRepository.CurrentSaleArray = (result.data as SaleItem[])
                localStorage.setItem("sales", JSON.stringify(DataRepository.CurrentSaleArray))
                UIRepository.OnChangedData()
            }).catch((err) => {
                alert("Error in DoInitDetails2::Remote: " + err)
            })
        } catch (e) {
            alert("Exception in DoInitDetails2::Remote: " + e)
        }

        try {
            Axios.get('https://yaposhka64.ru/getaddress.json', {
                headers: {
                    "CheckMobileApp": "true"
                }
            }).then(result => {
                DataRepository.CurrentAddrArray = (result.data as AddrItem[])
                localStorage.setItem("addrs", JSON.stringify(DataRepository.CurrentAddrArray))
                UIRepository.OnChangedData()
            }).catch((err) => {
                alert("Error in DoInitDetails3::Remote: " + err)
            })
        } catch (e) {
            alert("Exception in DoInitDetails3::Remote: " + e)
        }
    }

    private static OnIncomingDetailsResponse(detailsResponse: GetDetailsResponse): void {
        this.CurrentProductBase = new ProductBase().Import(detailsResponse)
        UIRepository.OnChangedData()
    }
}

export default DataRepository