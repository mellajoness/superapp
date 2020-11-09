interface ISecretQuestion {
    id: number,
    groupId: number,
    question: string,
    isActive: boolean,
    createdDate: string
}

interface IAddUserSecretQuestionAndAnswer {
    phoneNumber: string,
    phoneUUID: string,
    otp: string,
    secretQuestionOne: string,
    secretAnswerOne: string,
    secretQuestionTwo: string,
    secretAnswerTwo: string,
    secretQuestionThree: string,
    secretAnswerThree: string
}