part of ReverseText;

class PrepareControllerCommand extends mvc.SimpleCommand
{
  void execute( mvc.INotification note )
  {
    facade.registerCommand( AppNotes.PROCESS, () => new ProcessTextCommand() );
  }
}