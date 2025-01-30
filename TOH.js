let towers = {
    1: [],
    2: [],
    3: []
};

let numDisks = 5; // Set the number of disks to 5
let moveCount = 0; // Initialize move counter

// Initialize the first tower with disks
for (let i = numDisks; i >= 1; i--) {
    towers[1].push(i);
}

// Function to move disks
function moveDisk(towerNumber) {
    // Check if the selected tower has disks
    if (towers[towerNumber].length === 0) {
        alert("No disks to move from this tower!");
        return;
    }

    // Move the top disk from the selected tower to the next tower
    let disk = towers[towerNumber].pop();
    let nextTower = (towerNumber % 3) + 1; // Cycle through towers 1, 2, 3

    // Check if the next tower is empty or the top disk is larger
    if (towers[nextTower].length === 0 || towers[nextTower][towers[nextTower].length - 1] > disk) {
        towers[nextTower].push(disk);
        moveCount++; // Increment the move counter
        document.getElementById('moveCount').innerText = moveCount; // Update the move count display
        updateTowers(); // Update the visual representation of the towers
    } else {
        alert("Invalid move! You cannot place a larger disk on a smaller disk.");
        towers[towerNumber].push(disk); // Return the disk back
    }
}

// Function to update the visual representation of the towers
function updateTowers() {
    for (let i = 1; i <= 3; i++) {
        let towerDiv = document.getElementById(`tower${i}`);
        towerDiv.innerHTML = ''; // Clear the tower

        // Create visual representation of disks
        towers[i].forEach((disk, index) => {
            let diskDiv = document.createElement('div');
            diskDiv.className = 'disk';
            diskDiv.style.width = `${disk * 20}px`; // Adjust width based on disk size
            diskDiv.style.backgroundColor = getDiskColor(disk); // Set color based on disk size
            diskDiv.style.bottom = `${index * 22}px`; // Stack disks vertically
            towerDiv.appendChild(diskDiv);
        });
    }
}

// Function to get color for each disk
function getDiskColor(disk) {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD']; // Array of colors
    return colors[disk - 1]; // Return color based on disk size
}

// Initial update to display the starting state
updateTowers();