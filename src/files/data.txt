#NoEnv ;disables checking for running environment variables
#SingleInstance Force ;only 1 instance of the script can run at a time
SetWorkingDir, %A_ScriptDir% ;sets working directory to scripts

xlFile := A_ScriptDir "\UserData.xlsx" ;set the path for the Excel file

; === GUI Layout ===
Gui, Add, Text,, Name: ;asks for user name
Gui, Add, Edit, vName w200 ;user input field for name
Gui, Add, Text,, Email: ;ask for user email
Gui, Add, Edit, vEmail w200 ;user email input field
Gui, Add, Text,, Age: ;ask for user age
Gui, Add, Edit, vAge w200 ;user age input field
Gui, Add, Button, gSubmit, Submit ;button to submit data
Gui, Show,, Enter User Data
return

Submit:
Gui, Submit ;submits the GUI data to variables

; === Create Excel file if not exists ===
if !FileExist(xlFile) {  ;RUNS IF THE FILE DOES NOT EXIST
    xl := ComObjCreate("Excel.Application") ;create an instance of Excel
    wb := xl.Workbooks.Add() ;create a new workbook
    ws := wb.Worksheets(1) ;goes to the first worksheet
    ws.Cells(1, 1).Value := "Name" ; creates headers in the first row
    ws.Cells(1, 2).Value := "Email"
    ws.Cells(1, 3).Value := "Age"
    wb.SaveAs(xlFile) ;save the workbook
    wb.Close() ;close the workbook
    xl.Quit() ;quit Excel
}

; === Append to Excel ===
xl := ComObjCreate("Excel.Application") ;opens an instance of Excel
xl.Visible := False ;not visible to the user
wb := xl.Workbooks.Open(xlFile) ;opens the existing workbook
ws := wb.Worksheets(1) ;goes to the first worksheet

row := ws.UsedRange.Rows.Count + 1 ;finds the next empty row
ws.Cells(row, 1).Value := Name ;sets user input to the next row
ws.Cells(row, 2).Value := Email     
ws.Cells(row, 3).Value := Age

wb.Save() ;save the workbook
wb.Close() ;close the workbook
xl.Quit() ;quits

MsgBox, Data is added yipppe.
GuiClose:
ExitApp
