export function checkCpfAndCnpjIsValid(cpforCnpj: string): boolean {
    const stripped = cpforCnpj.replace(/[^\d]+/g, '');


    if (!stripped) return false;
    if (stripped.length !== 11 && stripped.length !== 14) return false;
    if (/^(\d)\1+$/.test(stripped)) return false;

    const isCpf = stripped.length === 11;
    const digits = stripped.split('').map(x => parseInt(x, 10));

    return isCpf ? isValidCpf(digits) : isValidCnpj(digits);
}

function isValidCpf(digits: number[]): boolean {
    let sum1 = 0, sum2 = 0;

    for (let i = 0; i < 9; i++) {
        sum1 += digits[i] * (10 - i);
        sum2 += digits[i] * (11 - i);
    }

    sum1 = (sum1 % 11) < 2 ? 0 : 11 - (sum1 % 11);
    sum2 += sum1 * 2;
    sum2 = (sum2 % 11) < 2 ? 0 : 11 - (sum2 % 11);

    return sum1 === digits[9] && sum2 === digits[10];
}

function isValidCnpj(cnpj: number[]): boolean {

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = cnpj.slice(0, 12).reduce((acc, val, i) => acc + val * weights1[i], 0);
    let checker = (sum % 11) < 2 ? 0 : 11 - (sum % 11);

    if (checker !== cnpj[12]) {
        return false;
    }

    sum = cnpj.slice(0, 13).reduce((acc, val, i) => acc + val * weights2[i], 0);
    checker = (sum % 11) < 2 ? 0 : 11 - (sum % 11);

    return checker === cnpj[13];
}
