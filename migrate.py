import sys
import os
import subprocess
from subprocess import call, check_output

EXPORT_PROFILE = "primary"

# Get a list of all users.
user_list_out = check_output(["databricks", "workspace", "ls", "/Users", "--profile", EXPORT_PROFILE])
user_list = (user_list_out.decode(encoding="utf-8")).splitlines()

print (user_list)

# Export folders and notebooks for each user.
# Note: This does not include libraries.

for user in user_list:
  print (("Trying to migrate workspace for user ") + user)

  subprocess.call(str("mkdir -p ") + str(user), shell = True)
  export_exit_status = call("databricks workspace export_dir /Users/" + str(user) + " ./" + str(user) + " --profile " + EXPORT_PROFILE, shell = True)

  if export_exit_status==0:
    print ("Export Success")
  else:
    print ("Export Failure")
print ("All done")
