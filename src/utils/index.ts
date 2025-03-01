import { customAlphabet } from "nanoid";

export const isValidEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|([a-zA-Z0-9]([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Strong password rules:
 * 1. Has a number
 * 2. Has a lowercase letter
 * 3. Has an uppercase letter
 * @param password
 */
export const isStrongPassword = (password: string) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/;
  return re.test(password);
};

export const haveAtLeastOneNumber = (password: string) => {
  const re = /^(?=.*\d).{1,}$/;
  return re.test(password);
};

export const haveAtLeastOneLowerCase = (password: string) => {
  const re = /^(?=.*[a-z]).{1,}$/;
  return re.test(password);
};

export const haveAtLeastOneUpperCase = (password: string) => {
  const re = /^(?=.*[A-Z]).{1,}$/;
  return re.test(password);
};
export const haveUnallowedCharacters = (password: string) => {
  const re = /[\(\)'\,\| ]/;
  return re.test(password);
};

export const isNetworkError = (error: any) => {
  return error.code === "ERR_NETWORK";
};

export const getURL = (url: string) => {
  return url
    ? `${process.env.REACT_APP_S3_URL}/${url}`
    : "/images/avatar_holder.jpg";
};

export const goodFileSize = (file: File, allowSize: number = 10): boolean => {
  const fileSize = Math.round(file.size / 1024);
  return fileSize <= allowSize * 1024;
};

export const validateImageDimensions = (
  file: File,
  width: number,
  height: number,
  callback: (result: boolean) => void,
) => {
  const img = new Image();
  img.src = window.URL.createObjectURL(file);
  img.onload = () => {
    if (img.width > width || img.height > height) {
      callback(false);
    } else {
      callback(true);
    }
  };
};

export const removeUndefinedAttribute = (values: any = {}) => {
  Object.keys(values).forEach((key) => {
    if (
      values[key] === null ||
      values[key] === undefined ||
      values[key] === "undefined" ||
      values[key] === ""
    ) {
      delete values[key];
    }
  });
  return values;
};

export const compareObjects = (currentObject: any, needCompareObject: any) => {
  const isObject = (object: any) => {
    return object != null && typeof object === "object";
  };
  const isDeepEqual = (object1: any, object2: any) => {
    const objKeys1 = Object.keys(object1);
    const objKeys2 = Object.keys(object2);

    if (objKeys1.length !== objKeys2.length) return false;

    for (const key of objKeys1) {
      const value1 = object1[key] as any;
      const value2 = object2[key];

      const isObjects = isObject(value1) && isObject(value2);

      if (
        (isObjects && !isDeepEqual(value1, value2)) ||
        (!isObjects && value1 !== value2)
      ) {
        return false;
      }
    }
    return true;
  };
  return isDeepEqual(
    removeUndefinedAttribute(currentObject),
    removeUndefinedAttribute(needCompareObject),
  );
};

export const containsEmptyElements = (arr: any[]): boolean => {
  return Object.values(arr).length !== arr.length;
};

export const reorder = (
  list: any[],
  startIndex: number,
  endIndex: number,
): any[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


export const getRandomCharsFromString = (charset: string, length: number) => {
  return new Array(length)
    .fill(0)
    .map(() => charset[Math.floor(Math.random() * charset.length)])
    .join("");
};

export function formatLocaleDateTimeString(date: string) {
    if (!date) return '';
    return new Date(date).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).split('/').join('-').replace(',', '');
}

export function formatNumber(number: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
}

export function formatNumberNoneCurrency(val: number) {
    const value = new Intl.NumberFormat('en-US', { style: "decimal" }).format(val);
    // need to format tofixed 2 decimal
    const parts = value.split(".");
    if (parts.length === 1) {
        return `${value}.00`;
    }
    if (parts.length === 2) {
        if (parts[1].length === 1) {
            return `${value}0`;
        }
        return value;
    }
    return value;
}


const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
export const uuid = () => {
    return customAlphabet(alphabet, 21)(21);
};