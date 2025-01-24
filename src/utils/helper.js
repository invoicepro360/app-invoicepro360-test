import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import numeral from "numeral"
import {useUtils } from "@/compositions/utils"
import Toastify from "toastify-js";
import cash from "cash-dom"
import { parseColor } from "tailwindcss/lib/util/color";

dayjs.extend(duration)

const {currencySymbol ,dateFormat}  = useUtils()

export const toRGB = (value) => {
    return parseColor(value).color.join(" ");
};

export const stringToHTML = (arg) => {
    const parser = new DOMParser(),
      DOM = parser.parseFromString(arg, "text/html");
    return DOM.body.childNodes[0];
  };

const helpers = {

    cutText(text, length) {
        if (text.split(" ").length > 1) {
            const string = text.substring(0, length)
            const splitText = string.split(" ")
            splitText.pop()
            return splitText.join(" ") + "..."
        } else {
            return text
        }
    },
    CurrencySymbol(){
        return currencySymbol.value
    },
    formatCurrency(value,showCurrencySymbol = true) {
        if(showCurrencySymbol){
            return `<span class="inline-block"><span class="float-left">${currencySymbol.value}</span><span>${numeral(value).format("0,0.00")}</span></span>`;          
        }        

        return `<span>${numeral(value).format("0,0.00")}</span>`;          

    },
    formatAmount(value,showCurrencySymbol = true) {
        if(showCurrencySymbol){
            return `${currencySymbol.value}${numeral(value).format("0,0.00")}`;          
        }        

        return `${numeral(value).format("0,0.00")}`;          

    },
    formatDate(date,df = '') {
        // console.log(dateFormat)
        if(df != ''){
            return dayjs(date).format(df)
        }

        return dayjs(date).format(dateFormat.value)
    },
    capitalizeFirstLetter(string) {
        if (string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        } else {
            return ""
        }
    },
    onlyNumber(string) {
        if (string) {
            return string.replace(/\D/g, "")
        } else {
            return ""
        }
    },
    timeAgo(time) {
        const date = new Date(
            (time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")
        )
        const diff = (new Date().getTime() - date.getTime()) / 1000
        const dayDiff = Math.floor(diff / 86400)

        if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
            return dayjs(time).format("MMMM DD, YYYY")
        }

        return (
            (dayDiff === 0 &&
                ((diff < 60 && "just now") ||
                    (diff < 120 && "1 minute ago") ||
                    (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
                    (diff < 7200 && "1 hour ago") ||
                    (diff < 86400 &&
                        Math.floor(diff / 3600) + " hours ago"))) ||
            (dayDiff === 1 && "Yesterday") ||
            (dayDiff < 7 && dayDiff + " days ago") ||
            (dayDiff < 31 && Math.ceil(dayDiff / 7) + " weeks ago")
        )
    },
    diffTimeByNow(time) {
        const startDate = dayjs(
            dayjs()
                .format("YYYY-MM-DD HH:mm:ss")
                .toString()
        )
        const endDate = dayjs(
            dayjs(time)
                .format("YYYY-MM-DD HH:mm:ss")
                .toString()
        )

        const duration = dayjs.duration(endDate.diff(startDate))
        const milliseconds = Math.floor(duration.asMilliseconds())

        const days = Math.round(milliseconds / 86400000)
        const hours = Math.round((milliseconds % 86400000) / 3600000)
        let minutes = Math.round(((milliseconds % 86400000) % 3600000) / 60000)
        const seconds = Math.round(
            (((milliseconds % 86400000) % 3600000) % 60000) / 1000
        )

        if (seconds < 30 && seconds >= 0) {
            minutes += 1
        }

        return {
            days: days.toString().length < 2 ? "0" + days : days,
            hours: hours.toString().length < 2 ? "0" + hours : hours,
            minutes: minutes.toString().length < 2 ? "0" + minutes : minutes,
            seconds: seconds.toString(),
            milliseconds : milliseconds.toString(),
        }
    },
    isset(obj) {
        if (obj !== null && obj !== undefined) {
            if (typeof obj === "object" || Array.isArray(obj)) {
                return Object.keys(obj).length
            } else {
                return obj.toString().length
            }
        }

        return false
    },
    toRaw(obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    randomNumbers(from, to, length) {
        const numbers = [0]
        for (let i = 1; i < length; i++) {
            numbers.push(Math.ceil(Math.random() * (from - to) + to))
        }

        return numbers
    },
    notification : (isError,alertMessage,errors) => {

        let errorhtml = ''
        let html = ''
        
        if(isError){
            for (const error in errors){
                errorhtml += `<div class="text-slate-500 mt-1">${errors[error]}</div>`
            }
        
            html = `<div id="notification-div" class="toastify-content flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" 
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                            class="feather feather-x-circle text-error block">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15">
                                </line><line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        <div class="ml-2 mr-4">
                            <div class="font-medium text-error">${alertMessage}</div>
                            <div class="text-error">${errorhtml}</div>        
                        </div>
                    </div>`;
        }else{
            html = `<div id="notification-div" class="toastify-content flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                    class="feather feather-check-circle text-success block">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div class="ml-2 mr-4 "><div class="font-medium text-success">${alertMessage}</div></div>
            </div>`;
        }
    
        Toastify({
            node: cash(html)[0],
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
        }).showToast();
    }
}

const install = app => {
    app.config.globalProperties.$h = helpers
}

export { install as default, helpers as helper }
