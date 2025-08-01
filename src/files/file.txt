;source code by owin!
;Regular inputs + variable files creation
#NoEnv ;performance improvement
#SingleInstance Force ; runs only one instance of the script
SetWorkingDir, %A_ScriptDir% ;set working directory in the scripts directory
sourceFolder := A_ScriptDir "\SortingMachine" ;creates folder for sorting files
backupFolder := A_ScriptDir "\Backup" ;creates folder for backups
FileCreateDir, %sourceFolder% ;create source folder if it doesn't exist
FileCreateDir, %backupFolder%
;====================================================================================================================
;GUI Creation
 ; user interface for selecting actions
Gui, Add, Checkbox, vAlpha, Sort Alphabetically ;adds checkbox for sorting alphabetically
Gui, Add, Checkbox, vSize, Sort by File Size 
Gui, Add, Checkbox, vBackup, Backup Folder
Gui, Add, Button, gStart w100, Start ;when clicked, it will start the action jump to startaction
Gui, Show,w400 h400, File Organizer ;name of the GUI window and shows it
Return

Start:
Gui, Submit, NoHide ;retrieves variables from GUI, and does not hide after submitting

if (Backup) ;if backup is checked
    BackupFolder()

if (Size) ;if size is checked
{
    SortBySize()
}
else if (Alpha) ;if alphabetic sorting is checked and size is not
{
    SortAlphabetically(sourceFolder)
}

MsgBox, Organization has finished!
Return
;====================================================================================================================

;actual code
SortBySize() {
    global sourceFolder, Alpha ;Gets source folder location, and variable

    smallLimit := 5*1024*1024 ;sets small files to 5MB
    mediumLimit := 50*1024*1024 ;sets medium files to 50MB

    smallDir := sourceFolder "\Small"  ;holds path to small files folder
    mediumDir := sourceFolder "\Medium"  ;holds path to medium files folder
    largeDir := sourceFolder "\Large" ;holds path to large files folder

    FileCreateDir, %smallDir% ;create small files folder if it doesn't exist
    FileCreateDir, %mediumDir% ;create medium files folder if it doesn't exist
    FileCreateDir, %largeDir%   ;create large files folder if it doesn't exist

    ; Move files into size folders
    Loop, Files, %sourceFolder%\*, R ;loops through all files in the source folder
    {
        if (A_LoopFileName = "SortingMachine.ahk") ;skip the script file itself
            continue
        if (A_LoopFileAttrib contains D) ;skip the folders
            continue
        ; Get file size and move to appropriate folder
        file := A_LoopFileFullPath ;get the full path of the file
        size := GetFileSize(file) ;gets the size
        SplitPath, file, name ;splits the file path and name

        if (size < smallLimit)
            FileMove, %file%, %smallDir%\%name%, 1
        else if (size < mediumLimit) 
            FileMove, %file%, %mediumDir%\%name%, 1
        else
            FileMove, %file%, %largeDir%\%name%, 1
    }

    ; Alphabetically sort inside size folders if requested
    if (Alpha) { ; if alphabetic sorting is checked
        SortAlphabetically(smallDir)
        SortAlphabetically(mediumDir)
        SortAlphabetically(largeDir)
    }
}

SortAlphabetically(filepaths) { ;sort by alphabet get folder as parameter
    Loop, Files, %filepaths%\*, F ;loop through all files in folders
    {
        file := A_LoopFileFullPath ;get the full path of the file
        SplitPath, file, name ;split the file path and name
        firstChar := SubStr(name, 1, 1) ;get the first character of the file name
        StringUpper, firstChar, firstChar ;optional: normalize to uppercase A-Z
        targetDir := filepaths "\" firstChar ; assigns \A, \B, etc.
        FileCreateDir, %targetDir% ;create the letter folder
        FileMove, %file%, %targetDir%\%name%, 1 ;move file into folder
    }
}

BackupFolder() { ;backup function
    global sourceFolder, backupFolder ;variables
    FormatTime, timestamp,, yyyy-MM-dd_HH-mm-ss ;gets the tiume , dates
    backupPath := backupFolder "\Backup_" timestamp ".zip" ;creats .zip file with timestamp

    ; Use PowerShell Compress-Archive for ZIP creation
    powershellcommand =
    (
    Compress-Archive -Path '%sourceFolder%\*' -DestinationPath '%backupPath%' ;creates zip file for path sourcefolder, and all files in source, names it backup as path
    )

    RunWait, %comspec% /c powershell -Command "%powershellcommand%",, hide ; waits untill cmd is finished, runs cmd goes into powershell, and runs the command, hides from user
    MsgBox, Backup created:`n%backupPath%
}

GetFileSize(file) {
    FileGetSize, size, %file% ;gets file size of the file variable
    return size ;returns size
}

GuiClose:
ExitApp
