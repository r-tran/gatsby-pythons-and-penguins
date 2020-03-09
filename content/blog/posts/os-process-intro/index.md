---
title: 'Processes and a night of fine dining'
date: '2020-02-05'
spoiler: A gentle introduction to Linux processes
---

## A Night of Fine Dining at Gusteau's -- An Analogy
You've finally made it. You've waited months for your table at Gusteau's, a reservation-only fine dining restaurant. As you sit down, you notice that the restaurant space is limited, and you watch the wait staff float table to table to serve guests. Your maître d' hands you the menu. Tonight's dinner service is pre-fixe, and shortly after you order you hear the head chef call out to the kitchen of furiously working sous chefs.

Okay, so let me start by saying that operating systems is a hard subject, and that every analogy that attempts to describe the complexities of the OS falls short one way or the other. But at the same time, simplified explanations can greatly build our understanding of the fundamentals--the big picture is important!

So with that said, let's jump into some OS fundamentals, and see what ties we make to our restaurant analogy along the way 😊

## Environment Setup
All the code examples in this post are executed in a Linux CentOS8 Virtual Machine with Vagrant and VirtualBox.

If you'd like to follow along and don't have a Linux machine, don't worry! It's really easy to get set up.
Here's a couple links that I would recommend: 
- [Vagrant Getting Started](https://www.vagrantup.com/intro/getting-started/)
- [Centos8 Vagrantfile](https://app.vagrantup.com/generic/boxes/centos8)
- [Install Python on Centos8]()

## The Process Abstraction
The OS provides the process as an *abstraction* for an instance of a computer program. What this means is that the OS handles details that user programs, or clients, don't need to worry about. 

For example, when I launch desktop apps such as the Chrome web browser and Spotify, these programs run without knowing which CPU to target or which disk blocks to read and write from--this is the because the OS abstracts these details from users.

The *kernel* is the program that the OS runs to handle these implementation details, and it is responsible for virtualizing hardware resources like CPU and memory. For each running program, the kernel creates it as a process, manages its state, and allocates its virtual resources.

It's important to know that all computer programs run at a cost of **time** and **space**. 

To illustrate this, let's look at a small example with our Python script `count.py`:
```python
def count():
    counter = 0
    count_history = []
    while True:
        counter += 1
        count_history.append(counter)
count()
```
This code runs in an infinite `while` loop, incrementing the `counter` variable at each iteration. Each time this counter is incremented we'll save it to `count_history`, which is a Python `list` object.

Note that when we run this script, 1) it will run forever until interrupted, and 2) the `counter` value is incremented and stored to`count_history` as fast as possible. This is bad, and we'll see some problems happen as the process runs and starts to hog the available system resources.

We'll first run the script as a background process (so it doesn't block the command prompt) with `python3 count.py &`.
```bash
[vagrant@centos8 ~]$  python3 count.py &
[1] 7277
```
Note that the console output contains a number. This is a unique **process ID** (PID) that Linux assigns to keep track of all running processes.

Next, we'll run the command `top -p 7277`, which uses the PID obtained above to interactively monitor our Python program. 

With the `top` program, we can get a live view of how many resources our system processes consume. We won't go into detail on `top` in this post, but if you'd like to learn more about it please refer to the resources section below.

Below is my console window when I run the command. You can exit the session with Ctrl+C.
```bash
[vagrant@centos8 ~]$ top -p 7277
top - 02:48:02 up 1 day, 22:49,  1 user,  load average: 1.90, 0.57, 0.25
Tasks:   1 total,   1 running,   0 sleeping,   0 stopped,   0 zombie
%Cpu(s): 37.2 us, 52.3 sy,  0.0 ni,  0.8 id,  2.7 wa,  6.2 hi,  0.8 si,  0.0 st
MiB Mem :   1829.2 total,     59.8 free,   1740.4 used,     29.0 buff/cache
MiB Swap:   2120.0 total,    774.2 free,   1345.8 used.      1.3 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 7277 vagrant   20   0 2938060   1.5g    212 R  87.0  86.5   0:09.45 python3
 ```

There's a good amount information to comb through here, but let's focus on the last row of the output. We observe that the column `%CPU` has a value of **87.0** percent and the column `%MEM` has a similar value of **86.5** percent. We'll return to these values shortly.

While running `top`, we notice that the row with the process information disappears from the console--it looks like our Python program may have crashed. 

We can verify this by inspecting the kernel logs with the command `dmesg`. Below is a snippet we find in the command output:

```bash
[vagrant@centos8 ~]$ dmesg
.
.
.
[166911.549957] Out of memory: Kill process 7277 (python3) score 926 or sacrifice child
[166911.549982] Killed process 7277 (python3) total-vm:3769252kB, anon-rss:1668120kB, file-rss:12kB, shmem-rss:0kB
```
Evidently the process ran out of its allotted memory, and the kernel, identifying the error state, sends a signal to kill the process.

> If you are following along and the Python program is still running, you can stop it with: `kill -9 <PROGRAM_PID_HERE>`.

From our example with `count.py` we get a couple insights on how a process consumes resources:

1. **Processes Require CPU Time**

A process requires time to run on the CPU, and it's up to the kernel to determine which CPU the process runs on and for how long. As an OS has many processes running at the same time and only a limited number of CPUs, the kernel is responsible for scheduling the CPU time each process gets. The execution context, or worker for a process is called a **thread**, and I hope to cover this in future posts.

In `count.py`, the infinite `while` loop has an unbounded time cost, meaning it will consume as much CPU time as possible until interrupted. From our `top` output, the value `%CPU` is percentage CPU utilization, and 85% utilization effectively means that a single CPU is spending 85% of its time running `count.py`. This leaves less available CPU for other running processes.

2. **Processes Require Memory**

A process requires memory, which is the virtual space required to execute a computer program. The kernel maps this space from physical memory, and the amount of memory available is specified and fixed by hardware. 

Just like the time cost for `count.py` is unbounded, so is the space cost. This is because the Python object `count_history` monotonically increases in size as its saves the value of `counter` at each iteration.

We see physical memory usage `%Mem` at 85.6 percent, which is calculated by dividing the process' physical memory usage (the `top` output column `RES`) by the total available physical memory of the CentOS8 VM. Eventually `count_history` grows to exceed the amount of memory allotted by the kernel, and we see the program crash.

Similar to how the kernel shares CPU time among running processes, the kernel's system memory is a fixed resource that is shared among processes.

## Back to Gusteau's
Now to tie this all back to our analogy--let's imagine the restaurant Gusteau's is the OS kernel. Because the restaurant is so popular that it's reservation-only, it is up to the restaurant staff to schedule all reservations. The reservations are kept track of in a notebook which contains information such as the party's name, contact information, and reservation time. The restaurant books reservations for each guest in way that can be similar to how the kernel initializes a process by creating a data structure containing the PID, process state, and other system information. The kernel creates the process as a data abstraction just like the restaurant abstracts future guests as entries in a notebook.

During dinner service, the restaurant is bustling and there are waiters going from table to table. There is a limited number of waiters, and each waiter can only take a single table's order at a time. This is equivalent to how threads in a running process have to share the CPU with other programs. The waiting staff serves table based on restaurant's guidelines, and this can be analogous to the kernel's scheduling policies.

For the kitchen, demand for the special of the day increases faster than rate of which the restaurant can replenish its supply of ingredients. This is equivalent to memory consumption and how runaway process can consume the available physical memory of the kernel.

## Resources