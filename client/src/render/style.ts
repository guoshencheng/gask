export const commonBox = {
  bordered: {
    border: {
      type: 'line',
    },
    style: {
      hover: {
        bg: 'magenta',
      },
      focus: {
        border: {
          fg: 'magenta'
        },
        fg: '#56A8F9',
      },
      border: {
        fg: 'white'
      }
    }
  }
}

export const table = {
  style: {
    header: {
      fg: 'blue',
      bold: true
    },
    cell: {
      hover: {
        bg: 'yellow'
      },
      fg: 'magenta',
      selected: {
        bg: '#56A8F9',
      }
    }
  }
}

export const button = {
  primary: {
    style: {
      bg: 'blue',
      border: {
        fg: 'white',
      }
    }
  }
}

export const accountBox = {
  bordered: {
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'white'
      }
    }
  }
}