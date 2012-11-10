// Odd, but currently necessary. See VERSION for info.
library ReverseText;

// DART HTML Library
import 'dart:html';

// PureMVC Framework for Dart
import 'package:puremvc/puremvc.dart' as mvc;

// Model Tier
part 'src/model/proxy/TextProxy.dart';

// View Tier
part 'src/view/component/TextComponent.dart';
part 'src/view/mediator/TextComponentMediator.dart';
part 'src/view/event/AppEvents.dart';

// Controller Tier
part 'src/controller/command/StartupCommand.dart';
part 'src/controller/command/PrepareModelCommand.dart';
part 'src/controller/command/PrepareControllerCommand.dart';
part 'src/controller/command/PrepareViewCommand.dart';
part 'src/controller/command/ProcessTextCommand.dart';
part 'src/controller/constant/AppNotes.dart';

void main()
{
  // Get a unique multiton Facade instance for the application
  mvc.IFacade facade = mvc.Facade.getInstance( AppNotes.APPNAME );

  // Startup the application's PureMVC core
  facade.registerCommand( AppNotes.STARTUP, () => new StartupCommand() );
  facade.sendNotification( AppNotes.STARTUP );

}