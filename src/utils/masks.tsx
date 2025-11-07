class StaticClass {
  constructor() {
    throw new Error('This is a static class')
  }
}

const PATTERN_CPF = /(\d{3})(\d{3})(\d{3})(\d{2})/
const PATTERN_CNPJ = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
const PATTERN_ACCOUNTNUMBER = /(\d{8})(\d{1})/

const process = (mask: string, value: string) => {
  const arrayMask = mask.split('')
  const arrayValue = String(value).split('')
  return arrayMask.reduce((acc, curr) => {
    if (arrayValue.length) {
      if (curr === '9') {
        return acc + arrayValue.shift()
      }
      return acc + curr
    }

    return acc
  }, '')
}

export const getPureNumbers = (value: string) => {
  if (!value) {
    return ''
  }
  return value.replace(/\D+/g, '')
}

export const masks = {
  cep: (value: string) => {
    const pure = getPureNumbers(value)
    return process('99999-999', pure)
  },
  httpsPattern: (value: string) => {
    const strippedValue = value.replace('https://', '')
    return strippedValue ? 'https://' + strippedValue : ''
  },
  cepWithDot: (value: string) => {
    const pure = getPureNumbers(value)
    return process('99.999-999', pure)
  },
  cpf: (value: string) => {
    const pure = getPureNumbers(value)
    return process('999.999.999-99', pure)
  },
  cnpj: (value: string) => {
    const pure = getPureNumbers(value)
    return process('99.999.999/9999-99', pure)
  },
  documentOrEmail: (value: string) => {
    const hasLetters = verifyHasLetters(value)

    if (hasLetters) {
      return value
    }

    const pure = getPureNumbers(value)

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (emailPattern.test(value)) {
      return value
    }

    if (pure.length <= 11) {
      return masks.cpf(value)
    }
    return masks.cnpj(value)
  },
  document: (value: string) => {
    const pure = getPureNumbers(value)
    if (pure.length <= 11) {
      return masks.cpf(value)
    }
    return masks.cnpj(value)
  },
  comercialPhoneNumber: (value: string) => {
    const pure = getPureNumbers(!value ? '' : value)
    const hasCountry = value?.includes('+')

    const brasilianNumbers = (number: string, withCountry?: boolean) => {
      if (withCountry) {
        return `+${process('99 (99) 9999-9999', number)}`
      }
      if (number.length < 11) {
        return process('(99) 9999-9999', number)
      }
      return process('(99) 9999-9999', number)
    }

    if (hasCountry) {
      if (value?.includes('+1')) {
        return `+${process('9 (999) 999-9999', pure)}`
      }
      if (value?.includes('+5')) {
        return brasilianNumbers(pure, true)
      }

      return `+${process('99 (999) 999-9999', pure)}`
    }

    return brasilianNumbers(pure)
  },
  phoneNumber: (value: string) => {
    const pure = getPureNumbers(!value ? '' : value)
    const hasCountry = value?.includes('+')

    const brasilianNumbers = (number: string, withCountry?: boolean) => {
      if (withCountry) {
        return `+${process('99 (99) 99999-9999', number)}`
      }
      if (number.length < 11) {
        return process('(99) 9999-9999', number)
      }
      return process('(99) 99999-9999', number)
    }

    if (hasCountry) {
      if (value?.includes('+1')) {
        return `+${process('9 (999) 999-9999', pure)}`
      }
      if (value?.includes('+5')) {
        return brasilianNumbers(pure, true)
      }

      return `+${process('99 (999) 999-9999', pure)}`
    }

    return brasilianNumbers(pure)
  },
  date: (value: string) => {
    const pure = getPureNumbers(value)
    return process('99/99/9999', pure)
  },
  dateCard: (value: string) => {
    const pure = getPureNumbers(value)
    return process('99/99', pure)
  },
  cvv: (value: string) => {
    const pure = getPureNumbers(value)
    return process('999', pure)
  },
  cardNumber: (value: string) => {
    const pure = getPureNumbers(value)
    return process('9999 9999 9999 9999', pure)
  },
  accountNumber: (value: string) => {
    const pure = getPureNumbers(value)
    return process('99999999-9', pure)
  },
  onlyNumbers: (value: string) => {
    const pure = getPureNumbers(value)
    return pure
  },
  onlyLetters: (value: string) => {
    const pure = value.replace(/[^a-zA-Z]/g, '')
    return pure
  },
  rg: (value: string) => {
    const pure = getPureNumbers(value)
    return process('9.999.999', pure)
  },
  altitude: (value: string) => {
    const pure = getPureNumbers(value)
    const processedValue = process('9999999', pure)

    if (processedValue.length > 0) {
      return processedValue + 'm'
    }
    if (processedValue.length === 0) {
      return ''
    }

    return processedValue
  },
  color: (value: string) => {
    if (value.length > 0 && value.charAt(0) !== '#') {
      return '#' + value
    }
    return value
  },
  instagram: (value: string) => {
    const strippedValue = value.replace('www.instagram.com/', '')
    return strippedValue ? 'www.instagram.com/' + strippedValue : ''
  },
  currency: (value: string) => {
    const pure = getPureNumbers(value)
    const price = (Number(pure) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    })

    if (price.length > 0) return price

    if (price.length === 0) return ''

    return price
  },
  price: (amount: string) => {
    const price = (Number(amount) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    })
    return price
  },
  default: (value: string) => value,
}

const verifyHasLetters = (value: string): boolean => {
  return /[a-zA-Z]/.test(value)
}

export const formatColor = (value: string) => {
  if (value.length > 0 && value.charAt(0) !== '#') {
    return '#' + value
  }
  return value
}

export const currencyBrlMask = (value: string | null | undefined) => {
  if (!value) return
  const clearValue = value?.replace(/[^\d+]/g, '')
  const formattedValue = 'R$' + clearValue

  return formattedValue
}

export const CpfOrCnpjMask = (value: string | undefined) => {
  if (!value) return

  const clearValue = value?.replace(/[^\d+]/g, '')

  if (clearValue?.length <= 11) {
    const formattedValue = clearValue?.replace(PATTERN_CPF, '$1.$2.$3-$4')
    return formattedValue
  }
  if (clearValue.length > 11) {
    const formattedValue = clearValue?.replace(PATTERN_CNPJ, '$1.$2.$3/$4-$5')
    return formattedValue
  }
  return value
}

export const numberAccountMask = (value: string | null | undefined) => {
  if (!value) return

  const clearValue = value?.replace(/[^\d+]/g, '')
  const formattedValue = clearValue?.replace(PATTERN_ACCOUNTNUMBER, '$1-$2')
  return formattedValue
}

export const formatPhoneNumber = (value: string) => {
  const pure = value.replace(/\D+/g, '')
  return process('(99) 9 9999-9999', pure)
}

export const formatCep = (value: string) => {
  const pure = value.replace(/\D+/g, '')
  return process('99999-999', pure)
}

export type MasksTypes = keyof typeof masks

export class Mask extends StaticClass {
  static format(maskType: MasksTypes = 'default', value: string) {
    const mask = masks[maskType]
    return mask ? mask(value) : value
  }
}
