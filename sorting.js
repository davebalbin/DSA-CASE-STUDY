// Main function to start sorting
function startSorting() {
    const input = document.getElementById('inputNumbers').value;
    const numbers = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    // Allow less than 30 or exactly 30 integers
    if (numbers.length > 30) {
        alert("Please enter less than 30 integers or exactly 30 integers.");
        return;
    }

    // Clear previous outputs
    clearTabs();

    // Call sorting functions and display results in respective tabs
    document.getElementById('BubbleSort').innerHTML = displayAllSteps(bubbleSort([...numbers]));
    document.getElementById('InsertionSort').innerHTML = displayAllSteps(insertionSort([...numbers]));
    document.getElementById('SelectionSort').innerHTML = displayAllSteps(selectionSort([...numbers]));
    document.getElementById('MergeSort').innerHTML = displayAllSteps(mergeSort([...numbers]));
    document.getElementById('ShellSort').innerHTML = displayAllSteps(shellSort([...numbers]));
    document.getElementById('QuickSort').innerHTML = displayAllSteps(quickSort([...numbers]));
    document.getElementById('HeapSort').innerHTML = displayAllSteps(heapSort([...numbers]));

    // Open the first tab by default
    document.querySelector('.tablinks').click();
}

// Function to clear previous tab contents
function clearTabs() {
    const tabContents = document.querySelectorAll('.tabcontent');
    tabContents.forEach(tab => tab.innerHTML = '');
}

// Function to open a specific tab
function openTab(evt, tabName) {
    const tabcontents = document.querySelectorAll('.tabcontent');
    tabcontents.forEach(tab => tab.style.display = 'none');

    const tablinks = document.querySelectorAll('.tablinks');
    tablinks.forEach(link => link.className = link.className.replace(" active", ""));

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += " active";
}

// Function to display numbers in a formatted way
function displayNumbers(arr) {
    return arr.map(num => `<div class="number-box">${num}</div>`).join('');
}

// Function to display all steps of sorting
function displayAllSteps(steps) {
    return steps.map(step => `<div>${displayNumbers(step)}</div>`).join('');
}

// Sorting Algorithms

// Bubble Sort
function bubbleSort(arr) {
    const steps = [];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            steps.push([...arr]); // Capture the current state
        }
    }
    return steps;
}

// Insertion Sort
function insertionSort(arr) {
    const steps = [];
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        steps.push([...arr]); // Capture the current state
    }
    return steps;
}

// Selection Sort
function selectionSort(arr) {
    const steps = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        steps.push([...arr]); // Capture the current state
    }
    return steps;
}

// Merge Sort
function mergeSort(arr) {
    const steps = [];
    mergeSortHelper(arr, steps);
    return steps;
}

function mergeSortHelper(arr, steps) {
    if (arr.length <= 1) {
        steps.push([...arr]); // Capture the current state
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortHelper(arr.slice(0, mid), steps);
    const right = mergeSortHelper(arr.slice(mid), steps);
    const merged = merge(left, right);
    steps.push(merged); // Capture the merged state
    return merged;
}

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Heap Sort
function heapSort(arr) {
    const steps = [];
    const n = arr.length;

    for (let i = Math.floor(n / 2); i >= 0; i--) {
        heapify(arr, n, i, steps);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[ 0]];
        steps.push([...arr]); // Capture the current state after swap
        heapify(arr, i, 0, steps);
    }
    return steps;
}

function heapify(arr, n, i, steps) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        steps.push([...arr]); // Capture the current state after swap
        heapify(arr, n, largest, steps);
    }
}

// Shell Sort
function shellSort(arr) {
    const steps = [];
    const n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
            steps.push([...arr]); // Capture the current state
        }
        gap = Math.floor(gap / 2);
    }
    return steps;
}

// Quick Sort
function quickSort(arr) {
    const steps = [];
    quickSortHelper(arr, 0, arr.length - 1, steps);
    return steps;
}

function quickSortHelper(arr, low, high, steps) {
    if (low < high) {
        const pi = partition(arr, low, high, steps);
        quickSortHelper(arr, low, pi - 1, steps);
        quickSortHelper(arr, pi + 1, high, steps);
    }
}

function partition(arr, low, high, steps) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            steps.push([...arr]); // Capture the current state
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push([...arr]); // Capture the current state after pivot swap
    return i + 1;
}