// Sales data
const salesData = [20.49, 24.25, 57.45, 36.5, 41.92, 62.76, 25.86, 13.25, 141.1, 59.72, 11.94, 21.57, 71.04, 7.89, 76.83, 24.87, 20.23, 59.88, 15.18, 57.36, 13.31, 24.14, 19.37, 19.82, 71.84, 21.76, 15.28, 74.48, 147.95, 55.78, 22.15, 42.2, 23.63, 65.68, 52.6, 21.32, 45.36, 43.78, 34.84, 57.52, 29.88, 83.49, 16.65, 30.14, 122.4, 33.12, 26.51, 6.63, 10.11, 23.92, 27.58, 10.55, 38.45, 50.88, 46.96, 77.85, 52.74, 76.32, 22.02, 96.16, 26.78, 24.38, 94.04, 23.56, 55.8, 95.4, 16.22, 70.08, 19.29, 147.2, 25.03, 48.15, 27.2, 61.35, 65.24, 17.52, 21.1, 8.32, 63.05, 94.04, 32.48, 61.85, 19.46, 51.12, 45.85, 111.1, 6.5, 111.1, 54.66, 52.32, 8.63, 61.08, 30.66, 11.6, 28.4, 24.93, 46.82, 26.22, 140.85];

// Order status data
const orderStatusData = {
    'Completed': 728,
    'Pending': 644,
    'Canceled': 828
};

function initializeCharts() {
    // Line Chart
    const lineCtx = document.getElementById('salesChart');
    if (lineCtx) {
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: Array.from({length: salesData.length}, (_, i) => `Order ${i + 1}`),
                datasets: [{
                    label: 'Sales Amount ($)',
                    data: salesData,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Sales Trend Over Time',
                        font: {
                            size: 16
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `$${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Order Number'
                        },
                        ticks: {
                            maxTicksLimit: 20
                        }
                    }
                }
            }
        });
    }

    // Order Status Pie Chart
    const pieCtx = document.getElementById('orderStatusChart');
    if (pieCtx) {
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(orderStatusData),
                datasets: [{
                    data: Object.values(orderStatusData),
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.8)',  // Completed - Teal
                        'rgba(255, 206, 86, 0.8)',  // Pending - Yellow
                        'rgba(255, 99, 132, 0.8)'   // Canceled - Red
                    ],
                    borderColor: 'white',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Order Status Distribution',
                        font: {
                            size: 16
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = Object.values(orderStatusData).reduce((a, b) => a + b, 0);
                                const percentage = ((value * 100) / total).toFixed(1);
                                return `${label}: ${value} orders (${percentage}%)`;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Calculate statistics
    const totalSales = salesData.reduce((a, b) => a + b, 0);
    const averageSale = totalSales / salesData.length;
    const maxSale = Math.max(...salesData);
    const minSale = Math.min(...salesData);

    // Update statistics in the DOM
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    document.getElementById('totalSales').textContent = formatter.format(totalSales);
    document.getElementById('averageSale').textContent = formatter.format(averageSale);
    document.getElementById('maxSale').textContent = formatter.format(maxSale);
    document.getElementById('minSale').textContent = formatter.format(minSale);
}

// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', initializeCharts); 