import {    
    chooseCoefficientSpeed,
    calculatePrice,
    calculateWorkDuration,
    calculateResultDate,
} from "./helpers";
import moment from "moment";

describe('calculate coefficient and speed', () => {
    it.each`
        language      |    result
        ${"ua"}       | ${{coefficient: 0.05, speed: 1333}}
        ${"ru"}       | ${{coefficient: 0.05, speed: 1333}}
        ${"en"}       | ${{coefficient: 0.12, speed: 333}}
    `('returns the expected value of $result  when choose language $language', ({ language, result }) => {
      expect(chooseCoefficientSpeed(language)).toEqual(result)
    })
  })

  describe('calculate price', () => {
    test.each`
        length  | language |  coefficient  |  format      |  result
      ${1000}   | ${"ua"}  |    ${0.05}    | ${undefined} |  ${50}
      ${1000}   | ${"ru"}  |    ${0.05}    | ${".pdf"}    |  ${60}
      ${1000}   | ${"en"}  |    ${0.12}    | ${".doc"}    |  ${120}
      ${1000}   | ${"en"}  |    ${0.12}    | ${".pdf"}    |  ${144}
      ${10000}  | ${"ua"}  |    ${0.05}    | ${".pdf"}    |  ${600}
      ${10000}  | ${"ru"}  |    ${0.05}    | ${undefined} |  ${500}
      ${10000}  | ${"en"}  |    ${0.12}    | ${undefined} |  ${1200}
      ${10000}  | ${"en"}  |    ${0.12}    | ${".pdf"}    |  ${1440}
    `('returns the expected value of $result when $length multiplying $coefficient if we have format $format not ".pdf, doc, docx or undefined" result multiplying 1.2 ', ({ length, language, coefficient, format, result }) => {
      expect(calculatePrice( length, language, coefficient, format )).toBe(result)
    })
  })


describe('calculate work duration', () => {
    test.each`
        length  |  speed  |    format    | resultH
      ${2990}   | ${1333} | ${undefined} | ${3}
      ${7656}   | ${1333} | ${".doc"}    | ${6}
      ${7656}   | ${333}  | ${".doc"}    | ${23}
      ${10000}  | ${333}  | ${".pdf"}    | ${37.2}
      ${10000}  | ${333}  | ${".docx"}   | ${31}
    `('returns the expected value of duration $resultH hours when dividing lenth $length by speed $speed', ({ length, speed, format, resultH }) => {
        const expectedResult = resultH*60*60*1000
      expect(calculateWorkDuration( length, speed, format )).toBe(expectedResult)
    })
  })

  describe('calculate result date', () => {
    test.each`
      startTime                        | durationH  |   result
      ${'19.10.2020 10:00 Monday'}     | ${5}       |  ${"19.10.2020 o 15:00"}
      ${'16.10.2020 10:00 Friday'}     | ${12}      |  ${"19.10.2020 o 13:00"}
      ${'17.10.2020 14:00 Saturday'}   | ${8}       |  ${"19.10.2020 o 18:00"}
      ${'18.10.2020 14:00 Sunday'}     | ${2}       |  ${"19.10.2020 o 12:00"}
      ${'19.10.2020 07:00 Monday'}     | ${7}       |  ${"19.10.2020 o 17:00"}
      ${'21.10.2020 20:00 Wednesday'}  | ${3}       |  ${"22.10.2020 o 13:00"}
      ${'19.10.2020 07:00 Monday'}     | ${7}       |  ${"19.10.2020 o 17:00"}
      ${'20.10.2020 10:00 Tuesday'}    | ${60}      |  ${"28.10.2020 o 16:00"}
      ${'17.10.2020 18:00 Saturday'}   | ${60}      |  ${"27.10.2020 o 16:00"}
    `('returns the expected value of result date $result  when start time $startTime add $durationH h', ({ startTime, durationH, result }) => {
        const durationMs = durationH * 60 * 60 * 1000
        const time = moment(startTime, "DD.MM.YYYY HH:mm dddd").local("uk").valueOf()
      expect(calculateResultDate( time, durationMs )).toBe(result)
    })
  })


