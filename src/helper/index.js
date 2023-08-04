export const useAuth = () => {
    return localStorage.getItem("isLogin");
}

export const dateFormate = (seconds) => {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  return formattedDate || '-';
}

export const dateDifference = (seconds) => {
  const today = new Date();
  const givenDate = new Date(seconds * 1000);
  
  // Calculate the time difference in milliseconds
  const timeDiff = today.getTime() - givenDate.getTime();
  
  // Convert the time difference to days
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  return daysDiff - 1;
}

export function generateUniqueCode() {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

export function getRoundedUpAmount(number) {
  const integerPart = Math.floor(number);
  const roundedUpAmount = number - integerPart;
  return parseFloat(roundedUpAmount.toFixed(2));
}

export const stateData = [
  { label: "Gujarat", value: 24 },
  { label: "Maharashtra", value: 27 }
];


export const priceCalculator = {
  assembleValue: (quantity, price) => (parseFloat(quantity) * parseFloat(price)).toFixed(2),
  igst: (price, gst) => (parseFloat(price) * (parseFloat(gst)/100)).toFixed(2),
  gst: (price, gst) => ((parseFloat(price) * (parseFloat(gst)/100))/2).toFixed(2),
  total: (price, gst) => (parseFloat(price) + parseFloat(gst)).toFixed(2) 
}

export const wordify = (num) => {
  const single = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const double = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const formatTenth = (digit, prev) => {
    return digit === 0 ? "" : ` ${digit === 1 ? double[prev] : tens[digit]}`;
  };

  const formatOther = (digit, next, denom) => {
    return `${digit !== 0 && digit !== 1 ? ` ${single[digit]}` : ""}${(digit !== 0 || next !== 0) ? ` ${denom}` : ""}`;
  };

  let res = "";
  let words = [];

  if (isNaN(parseInt(num))) {
    res = "";
  } else if (parseInt(num) > 0 && num.length <= 10) {
    for (let index = num.length - 1; index >= 0; index--) {
      const digit = parseInt(num[index]);
      const next = index > 0 ? parseInt(num[index - 1]) : 0;

      switch (num.length - index - 1) {
        case 0:
          words.push(formatOther(digit, next, ""));
          break;
        case 1:
          words.push(formatTenth(digit, parseInt(num[index + 1])));
          break;
        case 2:
          words.push(digit !== 0 ? ` ${single[digit]} Hundred${(num[index + 1] !== 0 && num[index + 2] !== 0) ? " and" : ""}` : "");
          break;
        case 3:
          words.push(formatOther(digit, next, "Thousand"));
          break;
        case 4:
          words.push(formatTenth(digit, parseInt(num[index + 1])));
          break;
        case 5:
          words.push(formatOther(digit, next, "Lakh"));
          break;
        case 6:
          words.push(formatTenth(digit, parseInt(num[index + 1])));
          break;
        case 7:
          words.push(formatOther(digit, next, "Crore"));
          break;
        case 8:
          words.push(formatTenth(digit, parseInt(num[index + 1])));
          break;
        case 9:
          words.push(digit !== 0 ? ` ${single[digit]} Hundred${(num[index + 1] !== 0 || num[index + 2] !== 0) ? " and" : " Crore"}` : "");
          break;
        default:
      }
    }

    res = words.reverse().join("");
  } else {
    res = "";
  }

  return res;
};
