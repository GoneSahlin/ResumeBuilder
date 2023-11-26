"""
  Copies missing tex requirements from my texlive installation to tlsb-gui-installer

  create ./file_list by running pdflatex -recorder -/tmp/output /tmp/input/resume.tex

  run from this directory with:
  $ python3 find_files.py
"""


import subprocess
import shutil
import os


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

    # find in my installation
    bash_command = ["find", "/usr/share/texlive/", "-name", filename]
    process = subprocess.Popen(bash_command, stdout=subprocess.PIPE)
    output, error = process.communicate()

    if error:
      print(error)

    if not output:
      print("could not find file")
    else:
      filepath_str = output.decode("utf-8").strip()
      filepath = filepath_str.split('/')

      # print(filepath_str)
      print(len(filepath_str.splitlines()))
      
      new_filepath = ["..", "tlsb-gui-installer"]
      new_filepath.extend(filepath[4:])

      new_filepath_str = "/".join(new_filepath)

      # print(new_filepath_str)

      # os.makedirs(os.path.dirname(new_filepath_str), exist_ok=True)
      # shutil.copyfile(filepath_str, new_filepath_str)
