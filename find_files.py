import subprocess

with open("file_list", "r") as file_list:
  for line in file_list.readlines():
    filename = line.strip().split(sep=" ")[0]
    
    bash_command = ["find", "./", "-name", filename]
    process = subprocess.Popen(bash_command, stdout=subprocess.PIPE)
    output, error = process.communicate()
    
    if error:
      print(error)

    if not output:
      print(filename)
