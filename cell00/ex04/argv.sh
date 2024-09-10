if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 0
fi


for ((i=1; i<=3 && i<=$#; i++)); do
    echo "${!i}"
done
