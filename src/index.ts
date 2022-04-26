import fs from "fs"
import { listMessages } from "./features/listMessages"
import { authorize } from "./auth"
import { CREDENTIAL_PATH } from "./constants"

// Load client secrets from a local file.
fs.readFile(CREDENTIAL_PATH, (err, content) => {
	if (err) return console.log("Error loading client secret file:", err)

	// Authorize a client with credentials, then call the Gmail API.
	// You can execute your function here
	authorize(JSON.parse(content.toString()), listMessages)
})
