/*
 * Response Code
 *
 * for http response codes
 */

import { IconAlertCircle, IconInfo } from 'common2'
import dayjs from 'dayjs'
import { isUnixMicro, unixMicroToIsoTimestamp } from '.'

export const ResponseCodeFormatter = ({ value }: any) => {
  if (!value) {
    return (
      <div>
        <label className="text-xs text-scale-800">No data</label>
      </div>
    )
  }

  const split = value.toString().split('')[0]

  switch (split) {
    // 2XX || 1XX responses
    case '1':
    case '2':
      return (
        <div className="flex h-full items-center">
          <div
            className="relative flex h-6 items-center justify-center rounded border bg-scale-500 px-2
            py-1 text-center dark:bg-scale-400
            "
          >
            <label className="block font-mono text-sm text-scale-900">{value}</label>
          </div>
        </div>
      )
      break
    // 5XX responses
    case '5':
      return (
        <div className="flex h-full items-center">
          <div
            className="relative flex h-6 items-center justify-center rounded bg-red-400 px-2 py-1
            text-center

            "
          >
            <label className="block font-mono text-sm text-red-1100">{value}</label>
          </div>
        </div>
      )
      break
    // 4XX || 3XX responses
    case '4':
    case '3':
      return (
        <div className="flex h-full items-center">
          <div
            className="relative flex h-6 items-center justify-center rounded bg-amber-400 px-2 py-1
            text-center

            "
          >
            <label className="block font-mono text-sm text-amber-1100 dark:text-amber-900">
              {value}
            </label>
          </div>
        </div>
      )
      break
    // All other responses
    default:
      return (
        <div className="flex h-full items-center">
          <div
            className="relative flex h-6 items-center justify-center rounded bg-scale-300 px-2 py-1
            text-center

            "
          >
            <label className="block font-mono text-sm text-scale-900">{value}</label>
          </div>
        </div>
      )
      break
  }
}

/*
 * Response Code
 *
 * for http response codes
 */

export const SeverityFormatter = ({
  value,
  uppercase = true,
}: {
  value: string
  uppercase?: boolean
}) => {
  if (!value) {
    return (
      <div>
        <label className="text-xs text-scale-800">No data</label>
      </div>
    )
  }

  const uppercasedValue = value.toUpperCase()
  const text = uppercase ? uppercasedValue : value

  switch (uppercasedValue) {
    case 'UNCAUGHTEXCEPTION':
    case 'PANIC':
    case 'FATAL':
    case 'ERROR':
      return (
        <div className="flex h-full items-center gap-1">
          <div className=" rounded p-0.5 !text-red-900">
            <IconAlertCircle size={14} strokeWidth={2} />
          </div>
          <span className="titlecase !block !text-red-900">{text}</span>
        </div>
      )
      break

    case 'INFO':

    case 'DEBUG':
      return (
        <div className="flex h-full items-center gap-1">
          <div className=" rounded p-0.5 !text-blue-900">
            <IconAlertCircle size={14} strokeWidth={2} />
          </div>
          <span className="titlecase !block !text-blue-900">{text}</span>
        </div>
      )
      break

    case 'LOG':
      return (
        <div className="flex h-full items-center gap-1">
          <div className=" rounded p-0.5 !text-blue-900">
            <IconInfo size={14} strokeWidth={2} />
          </div>
          <span className="titlecase !block !text-blue-900">{text}</span>
        </div>
      )
      break

    case 'WARNING':
      return (
        <div className="flex h-full items-center gap-1">
          <div className=" rounded p-0.5 !text-amber-900">
            <IconAlertCircle size={14} strokeWidth={2} />
          </div>
          <span className="titlecase !block !text-amber-900">{text}</span>
        </div>
      )
      break

    // All other responses
    default:
      return (
        <div className="flex h-full items-center">
          <div className="relative flex h-6 items-center justify-center rounded bg-scale-300 px-2 py-1 text-center">
            <label className="block font-mono text-sm text-scale-900">{text}</label>
          </div>
        </div>
      )
      break
  }
}

/**
 * Formats a timestamp into a local timestamp display
 *
 * Accepts either unix microsecond or iso timestamp.
 * For LogTable column rendering
 */
export const TimestampLocalFormatter = ({
  value,
  className,
}: {
  className?: string
  value: string | number
}) => {
  const timestamp = isUnixMicro(value) ? unixMicroToIsoTimestamp(value) : value
  const formattedTimestamp = dayjs(timestamp).format('DD MMM, HH:mm:ss')
  return <span className={`text-xs ${className}`}>{formattedTimestamp}</span>
}

/*
 * Header Formatter
 *
 * for http response codes
 */

export const HeaderFormmater = ({ value }: any) => {
  return <div className="flex h-full items-center text-xs font-normal text-scale-900">{value}</div>
}

/*
 * JSON Syntax Highlighter
 *
 * for http response codes
 */

export function jsonSyntaxHighlight(input: Object) {
  let json: string = JSON.stringify(input, null, 2)
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const newJson = json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,

    function (match) {
      var cls = 'number text-tomato-900'
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key text-scale-1200'
        } else {
          cls = 'string text-brand-1100'
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean text-blue-900'
      } else if (/null/.test(match)) {
        cls = 'null text-amber-1100'
      }
      return '<span class="' + cls + '">' + match + '</span>'
    }
  )

  const jsonWithLineWraps = newJson.split(`\n`).map((x) => {
    return `<span class="line text-xs">${x}</span>`
  })

  return jsonWithLineWraps.join('\n')
}
