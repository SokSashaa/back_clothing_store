const generateID = () => {
    return Array(18)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
};

const convertTimeToString = (date:Date) => { //замена generateID под вопросом
    return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
    }).replace(/[\/.,:\s]/g, '')
}

export const normalSizeFileName = (req, file, callback) => {
    const fileExtName = file.originalname.split('.').pop();

    callback(null, `${generateID()}.${fileExtName}`)
}