/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.monitoring;

import com.codahale.metrics.ConsoleReporter;
import com.codahale.metrics.MetricFilter;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.graphite.GraphiteReporter;
import com.codahale.metrics.graphite.PickledGraphite;
import com.codahale.metrics.jvm.GarbageCollectorMetricSet;
import com.codahale.metrics.jvm.MemoryUsageGaugeSet;
import com.codahale.metrics.log4j.InstrumentedAppender;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.net.InetSocketAddress;
import java.util.concurrent.TimeUnit;
import org.apache.commons.configuration.Configuration;
import org.apache.log4j.LogManager;

/**
 *
 * @author Michel
 */
@Singleton
public class Monitor {

    private static final MetricRegistry metrics = new MetricRegistry();

    private final boolean consoleEnabled;
    private final int consoleReportingInterval;

    private final boolean graphiteEnabled;
    private final String graphitePrefix;
    private final String graphiteServerAddress;
    private final int graphiteServerPort;
    private final int graphiteReportingInterval;

    @Inject
    public Monitor(Configuration configuration) {
        consoleEnabled = configuration.getBoolean("monitor.console.enabled", false);
        consoleReportingInterval = configuration.getInt("monitor.console.interval", 300);

        graphiteEnabled = configuration.getBoolean("monitor.graphite.enabled", false);
        graphitePrefix = configuration.getString("monitor.graphite.prefix", "blocklyprop");
        graphiteServerAddress = configuration.getString("monitor.graphite.address", "localhost");
        graphiteServerPort = configuration.getInt("monitor.graphite.port", 2003);
        graphiteReportingInterval = configuration.getInt("monitor.graphite.interval", 30);

        init();
    }
    
    private void init() {
        if (consoleEnabled) {
            ConsoleReporter reporter = ConsoleReporter.forRegistry(metrics).convertDurationsTo(TimeUnit.MILLISECONDS).build();
            reporter.start(consoleReportingInterval, TimeUnit.SECONDS);
        }

        if (graphiteEnabled) {
            final PickledGraphite pickledGraphite = new PickledGraphite(new InetSocketAddress(graphiteServerAddress, graphiteServerPort));
            final GraphiteReporter graphiteReporter = GraphiteReporter.forRegistry(metrics).prefixedWith(graphitePrefix).convertDurationsTo(TimeUnit.MILLISECONDS).filter(MetricFilter.ALL).build(pickledGraphite);
            graphiteReporter.start(graphiteReportingInterval, TimeUnit.SECONDS);
        }

        InstrumentedAppender appender = new InstrumentedAppender(metrics);
        appender.activateOptions();

        LogManager.getRootLogger().addAppender(appender);

        MemoryUsageGaugeSet memoryUsageGaugeSet = new MemoryUsageGaugeSet();
        metrics.registerAll(memoryUsageGaugeSet);

        GarbageCollectorMetricSet garbageCollectorMetricSet = new GarbageCollectorMetricSet();
        metrics.registerAll(garbageCollectorMetricSet);
    }

    public static MetricRegistry metrics() {
        return metrics;
    }

}
