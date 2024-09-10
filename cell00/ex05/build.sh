if [ "$#" -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

for arg in "$@"; do
    n="ex$arg"
    if [ ! -d "$n" ]; then
        mkdir "$n"
        # echo "Created directory: $n"
    else
        echo "Directory $n already exists"
    fi
done