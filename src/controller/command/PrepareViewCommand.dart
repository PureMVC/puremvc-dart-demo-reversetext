class PrepareViewCommand extends MVCSimpleCommand
{
  void execute( INotification note ) 
  {
    facade.registerMediator( new TextComponentMediator( new TextComponent() ) );
  }
}
