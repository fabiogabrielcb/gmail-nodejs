import { google } from "googleapis"
import { OAuth2Client } from "googleapis-common"

export function listLabels(auth: OAuth2Client) {
	const gmail = google.gmail({ version: "v1", auth })
	gmail.users.labels.list(
		{
			userId: "me",
		},
		(err, res) => {
			if (err) return console.log("The API returned an error: " + err)
			const labels = res!.data.labels
			if (labels!.length) {
				console.log("Labels:")
				labels!.forEach((label) => {
					console.log(`- ${label.name} (${label.id})`)
				})
			} else {
				console.log("No labels found.")
			}
		}
	)
}
