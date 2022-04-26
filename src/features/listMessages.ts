import { google } from "googleapis"
import { OAuth2Client } from "googleapis-common"

export function listMessages(auth: OAuth2Client) {
	const gmail = google.gmail({ version: "v1", auth })
	gmail.users.messages.list(
		{
			userId: "me",
			labelIds: ["INBOX"],
			maxResults: 10,
		},
		(err, res) => {
			if (err) return console.log("The API returned an error: " + err)
			const messagesList = res!.data.messages
			console.log("Messages:\n")
			messagesList!.forEach(async (value) => {
				const message = await gmail.users.messages.get({
					userId: "me",
					id: value.id ?? "",
					format: "full",
				})

				message.data.payload?.parts?.forEach((part) => {
					if (part.filename) {
						console.log("HAS FILE", part.partId)
					}
				})
			})
		}
	)
}
