import { TodoistEventTable } from "../share/table/todoist-event"

import { ScriptProperties } from "./config/script-properties"

export {}

declare const global: {
    doGet: (e: GoogleAppsScript.Events.DoGet) => GoogleAppsScript.Content.TextOutput
    doPost: (e: GoogleAppsScript.Events.DoPost) => GoogleAppsScript.Content.TextOutput
}

const scriptProperties = PropertiesService.getScriptProperties().getProperties() as ScriptProperties

type TodoistEventRequest = {
    event_name: string
    event_data: object
}

global.doGet = (e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.Content.TextOutput => {
    console.warn(e)
    return ContentService.createTextOutput()
}

global.doPost = (e: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput => {
    const request: TodoistEventRequest = JSON.parse(e.postData.contents)

    new TodoistEventTable(scriptProperties.spreadsheetId).insert({
        id: Utilities.getUuid(),
        eventName: request.event_name,
        eventData: JSON.stringify(request.event_data),
        dateCreated: new Date(),
    })

    return ContentService.createTextOutput()
}