class PrepareControllerCommand extends MVCSimpleCommand
{
  void execute( INotification note ) 
  {
    facade.registerCommand( AppNotes.PROCESS, () => new ProcessTextCommand() );
  }
}