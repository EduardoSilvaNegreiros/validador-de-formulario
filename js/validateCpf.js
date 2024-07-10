class ValidateCpf {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cleanCpf', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }


    generateNewCpf() {
        const cpfSemDigitos = this.cleanCpf.slice(0, -2);
        const digit1 = ValidateCpf.generateDigit(cpfSemDigitos);
        const digit2 = ValidateCpf.generateDigit(cpfSemDigitos + digit1);
        this.novoCpf = cpfSemDigitos + digit1 + digit2;
    }


    static generateDigit(cpfSemDigitos) {
        let total = 0;
        let reverse = cpfSemDigitos.length + 1;

        for (let stringNumerica of cpfSemDigitos) {
            total += reverse * Number(stringNumerica);
            reverse--;
        }

        const digit = 11 - (total % 11);
        return digit <= 9 ? String(digit) : '0';
    }

    isSequencia() {
        return this.cleanCpf.charAt(0).repeat(11) === this.cleanCpf;
    }

    valid() {
        if (!this.cleanCpf) return false;
        if (typeof this.cleanCpf !== 'string') return false;
        if (this.cleanCpf.length !== 11) return false;
        if (this.isSequencia()) return false;
        this.generateNewCpf();

        return this.novoCpf === this.cleanCpf;
    }
}



