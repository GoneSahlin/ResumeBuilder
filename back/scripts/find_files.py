"""
  Copies missing tex requirements from my texlive installation to tlsb-gui-installer

  create ./file_list by running pdflatex -recorder -/tmp/output /tmp/input/resume.tex

  run from this directory with:
  $ python3 find_files.py
"""


import subprocess
import shutil
import os


def is_in_local_dir(filename):
  bash_command = ["find", "../tlsb-gui-installer", "-name", filename]
  process = subprocess.Popen(bash_command, stdout=subprocess.PIPE)
  output, error = process.communicate()

  if error:
    print(error)

  if output:
    return True
  return False


def find_in_installation(filename):
  bash_command = ["find", "/usr/share/texlive/", "-name", filename]
  process = subprocess.Popen(bash_command, stdout=subprocess.PIPE)
  output, error = process.communicate()

  if error:
    print(error)

  if not output:
    return None
  
  # clean output
  lines = output.decode("utf-8").strip().splitlines()
  for line in lines:
    filepath_list = line.split('/')

    if "latex-dev" not in filepath_list:
      return "/".join(filepath_list)
    
  return None


def get_new_filepath(install_filepath):
  install_filepath_list = install_filepath.split("/")
  new_filepath_list = ["..", "tlsb-gui-installer"]
  new_filepath_list.extend(install_filepath_list[4:])

  new_filepath = "/".join(new_filepath_list)

  return new_filepath


def copy_file(src, dest):
  os.makedirs(os.path.dirname(dest), exist_ok=True)
  shutil.copyfile(src, dest)


with open("file_list", "r") as file_list:
  for line in file_list.readlines():
    filename = line.strip().split(sep=" ")[0]

    print(filename)
    
    if not is_in_local_dir(filename):
      install_filepath = find_in_installation(filename)      
      if install_filepath:
        new_filepath = get_new_filepath(install_filepath)
        copy_file(install_filepath, new_filepath)
      else:
        print("Not in install dir")
    else:
      print("Already in local dir")


# sudo yum install texlive-latex
#    28  tlmgr install
#    29  tlmgr install moderncv
#    34  sudo dnf install texlive-moderncv
#    36  sudo dnf install texlive-multirow
#    38  sudo dnf install texlive-arydshln
#    54  sudo dnf install texlive-ec
#    64  sudo dnf install texlive-fontawesome5
#    66  sudo dnf uninstall texlive-fontawesome5
#    74  sudo dnf install texlive-fontawesome
#    81  sudo dnf install texlive-fontawesome5
#    89  sudo dnf install texlive-fontspec
#    91  sudo dnf install texlive-fontawesome
#    93  sudo dnf install texlive-fontawesome
#    94  sudo dnf install texlive-graphicx
#    95  sudo dnf install texlive-fontawesome5

