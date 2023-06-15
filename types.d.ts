type Prices = string[]

type Option = {
    key: string,
    value: string,
}

type Question = {
    question: string,
    answerKey: string,
    nextBest: string,
    options: Option[],
    level: string,
}