import hashlib

def crackROT(input):
    # Try an offset of every possibility from 0 to 25
    for i in range(0, 26):
        output = ""
        # For every character in the provided input
        for j in range(len(input)):
            if not input[j].isalpha():
                output += ' '
            else:
                char = input[j]
                # Move the character along by the offset
                newChar = chr((ord(char) + i - 65) % 26 + 65)
                output += newChar
                
        print ("Combination " + str(i) + " = " + output)

# Output all 26 variations, as letters rotate through the alphabet
# At offset 13 we see "TESTING"
crackROT("GRFGVAT")
crackROT('LFSL RFD PSTB DTZW NIJSYNYD FGTWY FGTWY RJJY FY XFKJ MTZXJ G')


print()
print('ENCRYPT')
print()
def encrypt(input, ROTnum):
    output = ""
    for i in range(len(input)):
        if not input[i].isalpha():
            output += ' '
        else:  # if it is an alphabetical character, rotate it by the offset provided by the user.
            char = input[i]
            newChar = chr((ord(char) + ROTnum - 65) % 26 + 65)
            output += newChar
    print()
    print(output)
    print()
    return output
    

encrypt('GANG MAY KNOW YOUR IDENTITY ABORT ABORT MEET AT SAFE HOUSE B', 5)

'LFSL RFD PSTB DTZW NIJSYNYD FGTWY FGTWY RJJY FY XFKJ MTZXJ G'


def calculate_md5(file_path):
    md5_hash = hashlib.md5()
    with open(file_path, "rb") as file:
        # Read the file in chunks
        for chunk in iter(lambda: file.read(4096), b""):
            md5_hash.update(chunk)
    return md5_hash.hexdigest()

def check_md5(file_path, expected_md5):
    file_md5 = calculate_md5(file_path)
    return file_md5 == expected_md5

# Example usage
file_path = "path/to/your/file.txt"
expected_md5 = "your_expected_md5_hash"

if check_md5(file_path, expected_md5):
    print("MD5 hash matches. The file is unchanged.")
else:
    print("MD5 hash does not match. The file may be corrupted or modified.")


import hashlib

def calculate_hash(file_path):
    md5_hash = hashlib.md5()
    with open(file_path, "rb") as file:
        # Read the file in chunks
        for chunk in iter(lambda: file.read(4096), b""):
            md5_hash.update(chunk)
    return md5_hash.hexdigest()

def check_hashes(file_path):
    with open(file_path, "r") as file:
        for line in file:
            filename, expected_hash = line.strip().split()
            actual_hash = calculate_hash(filename)
            
            if actual_hash == expected_hash:
                print(f"{filename}: Hash matches.")
            else:
                print(f"{filename}: Hash does not match.")

# Example usage
txt_file_path = "md5s.txt"
check_hashes(txt_file_path)

    