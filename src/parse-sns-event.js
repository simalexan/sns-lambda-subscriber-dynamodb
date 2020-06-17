module.exports = (event) => {
	if (!event || !event.Records || !Array.isArray(event.Records)) {
		return [];
	}
	console.log(event.Records);
	let extractMessage = record => record.Sns && {
		message: record.Sns.Message,
		subject: record.Sns.Subject,
		messageAttributes: record.Sns.MessageAttributes
	};
	return event.Records.map(extractMessage).filter(message => message);
};
