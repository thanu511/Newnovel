const app = (function() {
    const result = document.getElementById('results');
    const minBox = document.getElementById('min');
    const maxBox = document.getElementById('max');
    let jobId = 0;

    
    function createRow(id, min, max) {
        let row = `
            <tr id='${id}' class='running'>
                <td>${id}</td>
                <td>${min}</td>
                <td>${max}</td>
                <td>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: 0%;"></div>
                    </div>
                    <span class="progress-text">0%</span>
                </td>
            </tr>        
        `;
        result.innerHTML += row;
    }

    function updateProgress(id, completed, total) {
        let row = document.getElementById(id);
        let progressBar = row.querySelector('.progress-bar');
        let progressText = row.querySelector('.progress-text');

       
        let progress = Math.round((completed / total) * 100); 
        progressBar.style.width = progress + '%';  
        progressText.textContent = progress + '%';  
    }

    function updateRow(id) {
        let row = document.getElementById(id);
        row.querySelector('td:nth-child(4)').textContent = "100%"; 
        row.classList.remove('running');
        row.classList.add('done');
    }

   
    function isPrime(n) {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    }
    function handleFindPrimes() {
        let min = +minBox.value;
        let max = +maxBox.value;

        if (isNaN(min) || isNaN(max) || min < 2 || max < 2 || min > max) {
            alert("Please enter valid minimum and maximum values.");
            return;
        }

        let id = ++jobId;
        createRow(id, min, max);

        let totalNumbers = max - min + 1;
        let completed = 0; 

        
        let progressInterval = setInterval(() => {
            updateProgress(id, completed, totalNumbers);
        }, 1000);  

       
        for (let i = min; i <= max; i++) {
            completed++;  

            
            let progressPercentage = Math.round((completed / totalNumbers) * 100);
            let row = document.getElementById(id);
            row.querySelector('td:nth-child(4)').textContent = progressPercentage + "%";

            
            
        }

        
        clearInterval(progressInterval);

      
        updateRow(id);
        
        updateProgress(id, totalNumbers, totalNumbers); 
    }

   
    minBox.value = 2;
    maxBox.value = 100;

    return {
        handleFindPrimes
    };
})();
