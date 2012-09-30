class PrepareViewCommand extends mvc.SimpleCommand
{
  void execute( mvc.INotification note ) 
  {
    facade.registerMediator( new TextComponentMediator( new TextComponent() ) );
  }
}
