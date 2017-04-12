function buildActivityParams(ecu, activityId, activityType, taskId, status, assignType, assignTo) {
  var inputParams = new tw.object.Map();
  inputParams.put("ecu", ecu);
  inputParams.put("activityId", activityId);
  inputParams.put("activityType", activityType);
  inputParams.put("taskId", taskId);
  inputParams.put("status", status);
  inputParams.put("assignType", assignType);
  inputParams.put("assignTo", assignTo);
  return inputParams;
};

function invokeActivityService(inputParams) {
  var serviceName = "DeusActivityService";
  var service = tw.system.model.findServiceByName(serviceName);
  if(service!=null) {
    var returnParams = new tw.object.Map();
    try {
        returnParams =  tw.system.executeServiceByName(serviceName, inputParams);
        return 0;
    } catch (e) {
        log.error("DEUS: Can't invoke service '" + serviceName + "'");
        log.error(e);
        return -1;
    }
  } else {
      log.error("DEUS: Can't retrive service '" + serviceName + "'");
      return -1;
  }
};

function startedActivityTask(task) {
  return invokeActivityService(
    buildActivityParams(task.ecu, task.activityId, "STARTED", task.taskId, task.status, task.assignedType, task.assignedTo)
  );
};

function takenActivityTask(task) {
  return invokeActivityService(
    buildActivityParams(task.ecu, task.activityId, "TAKEN", task.taskId, task.status, task.assignedType, task.assignedTo)
  );
};

function completedActivityTask(task) {
  return invokeActivityService(
    buildActivityParams(task.ecu, task.activityId, "COMPLETED", task.taskId, task.status, task.assignedType, task.assignedTo)
  );
};

function startedActivity(ecu, activityId, taskId, status, assignedType, assignedTo) {
  return invokeActivityService(
    buildActivityParams(ecu, activityId, "STARTED", taskId, status, assignedType, assignedTo)
  );
};

function takenActivity(ecu, activityId, taskId, status, assignedType, assignedTo) {
  return invokeActivityService(
    buildActivityParams(ecu, activityId, "TAKEN", taskId, status, assignedType, assignedTo)
  );
};

function completedActivity(ecu, activityId, taskId, status, assignedType, assignedTo) {
  return invokeActivityService(
    buildActivityParams(ecu, activityId, "COMPLETED", taskId, status, assignedType, assignedTo)
  );
};
